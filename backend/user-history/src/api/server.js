const express = require("express");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const axios = require("axios");
// const views_all = require("./controllers/playlists/views_all");
const { playlist: ctrl } = require("./controllers/index");
const app = express();
const cors = require("cors");
const { db } = require("../model/dbConnection");
const PORT = 3000;

app.use(cors());
app.use(express.json());

////////////////////////////////////////////////
app.get("/api/all_channels", (req, res) => {
  const rowCount = parseInt(req.query.limit) || 10;
  const orderBy = req.query.orderBy || "view_count";
  const title = req.query.title;

  console.log(rowCount);
  console.log(orderBy);
  console.log(title);

  let channelQuery;
  if (orderBy === "average_views") {
    channelQuery = `
        SELECT 
        a.*, 
        a.view_count / a.video_count AS average_views_per_video,
        (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100) AS global_average_views
        FROM all_channels a
        WHERE a.view_count > 1 AND a.video_count > 0
        ORDER BY (a.view_count / a.video_count) DESC, ABS(a.view_count - (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100)) ASC
        LIMIT ${rowCount};
        `;
  } else {
    if (!["view_count", "views_per_second", "video_count"].includes(orderBy)) {
      return res.status(400).send("Неправильний параметр сортування");
    }
    channelQuery = `SELECT * FROM all_channels ORDER BY ${orderBy} DESC LIMIT ${rowCount}`;
  }

  const playlistQuery = `
    SELECT
    playlists_channels.playlist_id,
    playlists_channels_content.video_id,
    all_channels.*,
    tpcu.*
    FROM
    playlists_channels
    INNER JOIN
    playlists_channels_content ON playlists_channels.playlist_id = playlists_channels_content.playlist_id
    INNER JOIN
    all_channels ON playlists_channels_content.video_id = all_channels.channel_id
    LEFT JOIN (
    SELECT *
    FROM playlists_channels_content_updates
    WHERE (playlist_id, iteration) IN (
        SELECT playlist_id, MAX(iteration)
        FROM playlists_channels_content_updates
        GROUP BY playlist_id
    )
    ) tpcu ON tpcu.playlist_id = playlists_channels.playlist_id AND tpcu.new_video_id = playlists_channels_content.video_id
    WHERE
    playlists_channels.title = ?
    ORDER BY playlists_channels_content.order_num
    LIMIT ${rowCount};
    `;

  const videoUpdatesQuery = `
    SELECT
    video_id,
    prev_likes,
    prev_views
    FROM
    videos_updates
    WHERE
    video_id = ?
    `;

  const updatesChannelQuery = `
    SELECT
    tpcu.*
    FROM
    playlists_channels_content_updates AS tpcu
    WHERE
    tpcu.playlist_id = ?
    AND tpcu.new_video_id IS NULL
    AND tpcu.old_video_id IS NOT NULL
    AND tpcu.iteration = (
        SELECT
        MAX(tpcu2.iteration)
        FROM
        playlists_channels_content_updates AS tpcu2
        WHERE
        tpcu2.playlist_id = tpcu.playlist_id
    );
    `;

  db.query(channelQuery, (err, channelResults) => {
    if (err) {
      return res.status(500).send("Помилка сервера");
    }

    if (!title) {
      return res.json({
        channels: channelResults,
      });
    }
    console.log(title);

    db.query(playlistQuery, [title], (err, playlistResult) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          code: 500,
          message: "Internal server error",
          channels: channelResults,
        });
      }
      const tasks = playlistResult.map((video) => {
        return new Promise((resolve) => {
          db.query(
            videoUpdatesQuery,
            [video.video_id],
            (err, videoUpdatesResult) => {
              if (err) {
                console.log("Error with playlist query:", err.message);
                resolve(video);
              } else {
                resolve({
                  ...video,
                  prev_likes: videoUpdatesResult[0]?.prev_likes,
                  prev_views: videoUpdatesResult[0]?.prev_views,
                });
              }
            }
          );
        });
      });

      Promise.all(tasks).then((playlistWithVideoUpdates) => {
        db.query(
          updatesChannelQuery,
          [playlistResult[0]?.playlist_id],
          (err, updatesChannel) => {
            if (err) {
              return res.status(500).json({
                status: "error",
                code: 500,
                message: "Internal server error",
                channels: channelResults,
              });
            }

            console.log("Playlist result:", playlistResult);

            res.status(200).json({
              channels: channelResults,
              playlist: playlistWithVideoUpdates,
              updatesChannel: updatesChannel,
            });
          }
        );
      });
    });
  });
});

// ================================== PLEYLISTS API =======================================

//всі відео по рейтингу views_per_second
app.get("/api/videos_all", (req, res) => {
  const id = req.query.id;

  // Перевіряємо чи надано ID
  if (!id) {
    return res.status(400).send("ID is required");
  }

  const sqlQuery = `SELECT id, titleUrl, title, viewes, views_per_second,video_count, likes_per_second, lengthVideo, okLike  FROM videos_all WHERE id="${id}"`;

  db.query(sqlQuery, (error, result) => {
    if (error) {
      console.error("An error occurred while executing the query:", error);
      return res.status(500).send("An error occurred");
    }

    // Віддаємо результати запиту
    res.json(result);
  });
});

// Всі дана по каналах таблиця all_channels

// app.get('/api/all_channels', (req, res) => {
//   const rowCount = parseInt(req.query.limit) || 10;
//   const orderBy = req.query.orderBy || 'view_count'; // за замовчуванням view_count

//   if (!['view_count', 'views_per_second', 'video_count'].includes(orderBy)) {
//       res.status(400).send('Неправильний параметр сортування');
//       return;
//   }

//   const query = `SELECT * FROM all_channels ORDER BY ${orderBy} DESC LIMIT ${rowCount}`;

//   db.query(query, (err, results) => {
//       if (err) {
//           console.error('Помилка виконання запиту:', err);
//           res.status(500).send('Помилка сервера');
//           return;
//       }

//       res.json(results);
//   });
// });

// app.get('/api/all_channels', (req, res) => {
//   const rowCount = parseInt(req.query.limit) || 10;
//   const orderBy = req.query.orderBy || 'view_count';

//   console.log(`orderBy:=============${orderBy}`)

//   let query;

//   if (orderBy === 'average_views') {
//     query = `
//     SELECT
//     a.*,
//     a.view_count / a.video_count AS average_views_per_video,
//     (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100) AS global_average_views
// FROM all_channels a
// WHERE a.view_count > 1 AND a.video_count > 0
// ORDER BY (a.view_count / a.video_count) DESC, ABS(a.view_count - (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100)) ASC
// LIMIT ${rowCount};

//     `;
// }

//  else {
//       if (!['view_count', 'views_per_second', 'video_count'].includes(orderBy)) {
//           res.status(400).send('Неправильний параметр сортування');
//           return;
//       }
//       query = `SELECT * FROM all_channels ORDER BY ${orderBy} DESC LIMIT ${rowCount}`;
//   }

//   db.query(query, (err, results) => {
//       if (err) {
//           console.error('Помилка виконання запиту:', err);
//           res.status(500).send('Помилка сервера');
//           return;
//       }

//       res.json(results);
//   });
// });

// Дані по переглядах в секунду
app.get("/api/views_per_second", ctrl.views_per_second);

// всі відео дял дітей та по рейтингу популярності за перідо

app.get("/api/made_for_kids", ctrl.made_for_kids);

// Всі відео по  переглядах

app.get("/api/viewes", ctrl.views_all);

// Всі відео по  рейтингу  для дітей

//  PLEYLISTS API

app.get("/api/top_playlist", ctrl.top_playlist);

//// ================================== SORT API =======================================

app.get("/api/all/ageRating", (req, res) => {
  const page = req.query.page || 1; // За замовчуванням використовується сторінка 1
  const pageSize = 10; // Кількість відео на сторінку
  const offset = (page - 1) * pageSize;

  const sqlQuery = `SELECT * FROM videos_all WHERE made_for_kids = 1 ORDER BY views_per_second DESC LIMIT ${offset}, ${pageSize}`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        result: result,
      });
    }
  });
});

// Блоки для порівняння
app.get("/api/all/choice", (req, res) => {
  const sqlQuery = `SELECT * FROM videos_all ORDER BY RAND() LIMIT 2`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        code: 500,
        message: "Failed to get video IDs",
      });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        result,
      });
    }
  });
});

app.get("/api/video/:videoId", async (req, res) => {
  const videoId = req.params.videoId;

  try {
    const response = await axios.get(
      `https://www.youtube.com/watch?v=${videoId}`
    );
    const pageHtml = response.data;
    res.send(pageHtml);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving video page");
  }
});

// СОРТ ПО ДЛЯ ДОРОСЛІШИХ ДІТЕЙ АБО ДОРОСЛИХ
// app.post("/api/sorting", (req, res) => {
//   const { videoId1, videoId2 } = req.body;
//   const comparison = ">"; // Значення за замовчуванням або значення залежно від логіки

//   const sqlQuery = `INSERT INTO sorting (sorting_type, user_id, video_id_1, video_id_2, comparison) VALUES ('age', 1, ?, ?, ?)`;
//   db.query(sqlQuery, [videoId1, videoId2, comparison], (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({
//         status: "error",
//         code: 500,
//         message: "Failed to save video IDs",
//       });
//     } else {
//       res.status(200).json({
//         status: "success",
//         code: 200,
//         message: "Video IDs saved successfully",
//       });
//     }
//   });
// });

app.post("/api/sorting", (req, res) => {
  const { videoId1, videoId2, sortingType } = req.body; // Get the sorting type from the request
  const comparison = ">";

  const sqlQuery = `INSERT INTO sorting (sorting_type, user_id, video_id_1, video_id_2, comparison) VALUES (?, 1, ?, ?, ?)`;
  db.query(
    sqlQuery,
    [sortingType, videoId1, videoId2, comparison],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          status: "error",
          code: 500,
          message: "Failed to save video IDs",
        });
      } else {
        res.status(200).json({
          status: "success",
          code: 200,
          message: "Video IDs saved successfully",
        });
      }
    }
  );
});

app.patch("/api/sorting/:videoId1/:videoId2", (req, res) => {
  const { videoId1, videoId2 } = req.params;
  const { comparison } = req.body;

  const sqlQuery = `UPDATE sorting SET comparison = ? WHERE user_id = 1 AND video_id_1 = ? AND video_id_2 = ?`;
  db.query(sqlQuery, [comparison, videoId1, videoId2], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        code: 500,
        message: "Failed to update comparison",
      });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Comparison updated successfully",
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Conecting port: ${PORT}`);
});
