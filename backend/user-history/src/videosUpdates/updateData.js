const mysql = require("mysql");
const axios = require("axios");
require("dotenv").config();

const { HOST, USER, DATABASE, PASSWORD, KEY32 } = process.env;

const connection = mysql.createConnection({
  host: HOST,
  user: "root",
  database: DATABASE,
  password: PASSWORD,
  charset: "utf8mb4",
});

async function addUpdate(videoIdYouTube) {
  console.log(`Fetching data for videoId: ${videoIdYouTube}`);

  let youtubeResponse;
  let success = false;

  while (!success) {
    try {
      youtubeResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIdYouTube}&key=${KEY32}`
      );
      success = true;
    } catch (error) {
      console.error(
        `An error occurred while fetching videoId ${videoIdYouTube}: ${error}`
      );
      console.log(`Retrying request for videoId ${videoIdYouTube}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  const currDatetime = new Date();

  let newViews = null;
  let newLikes = null;

  if (youtubeResponse.data.items && youtubeResponse.data.items.length > 0) {
    newViews = parseInt(youtubeResponse.data.items[0].statistics.viewCount);
    newLikes = parseInt(youtubeResponse.data.items[0].statistics.likeCount);
    console.log(
      `Statistics for videoId ${videoIdYouTube}: views = ${newViews}, likes = ${newLikes}`
    );
  } else {
    console.log(`Cannot get statistics for videoId ${videoIdYouTube}`);
  }

  if (isNaN(newViews)) newViews = null;
  if (isNaN(newLikes)) newLikes = null;

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM videos_updates WHERE video_id = ? ORDER BY curr_datetime DESC LIMIT 1`,
      [videoIdYouTube],
      function (error, results) {
        if (error) {
          console.error(
            `Error fetching data from database for videoId ${videoIdYouTube}:`,
            error
          );
          reject();
        }

        const prevUpdate = results[0];
        const prevDatetime = prevUpdate ? prevUpdate.curr_datetime : null;
        const prevViews = prevUpdate ? prevUpdate.curr_views : 0;
        const prevLikes = prevUpdate ? prevUpdate.curr_likes : 0;
        const prevIteration = prevUpdate ? prevUpdate.iteration : 0;

        const newIteration = prevIteration + 1;

        const diffSeconds = (currDatetime - new Date(prevDatetime)) / 1000;
        const diffViews =
          newViews !== null && prevViews !== null ? newViews - prevViews : null;
        const diffLikes =
          newLikes !== null && prevLikes !== null ? newLikes - prevLikes : null;

        const viewsPerSecond =
          diffViews !== null && diffSeconds > 0
            ? Number((diffViews / diffSeconds).toFixed(6))
            : null;
        const likesPerSecond =
          diffLikes !== null && diffSeconds > 0
            ? Number((diffLikes / diffSeconds).toFixed(6))
            : null;

        connection.query(
          `UPDATE videos_all SET views_per_second = ?, likes_per_second = ?, viewes = ?, okLike = ? WHERE id = ?`,
          [viewsPerSecond, likesPerSecond, newViews, newLikes, videoIdYouTube],
          function (error) {
            if (error) {
              console.error(
                `Error updating data for videoId ${videoIdYouTube}:`,
                error
              );
            } else {
              console.log(
                `Successfully updated data for videoId ${videoIdYouTube}`
              );
            }
          }
        );

        connection.query(
          `INSERT INTO videos_updates (iteration, video_id, prev_datetime, prev_views, prev_likes, curr_datetime, curr_views, curr_likes, diff_seconds, diff_views, diff_likes, views_per_second, likes_per_second, processed_flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          [
            newIteration,
            videoIdYouTube,
            prevDatetime,
            prevViews,
            prevLikes,
            currDatetime,
            newViews,
            newLikes,
            diffSeconds,
            diffViews,
            diffLikes,
            viewsPerSecond,
            likesPerSecond,
          ],
          function (error) {
            if (error) {
              console.error(
                `Error inserting data for videoId ${videoIdYouTube}:`,
                error
              );
            } else {
              console.log(
                `Successfully inserted data for videoId ${videoIdYouTube}`
              );
              console.log(
                "===================================================="
              );
              console.log(
                "===================================================="
              );

              console.log(
                "===================================================="
              );
            }
            resolve();
          }
        );
      }
    );
  });
}

async function updateAllVideos() {
  connection.query(
    `SELECT MAX(iteration) AS maxIteration FROM videos_updates`,
    (error, result) => {
      if (error) {
        console.error(`Помилка при визначенні maxIteration:`, error);
        return;
      }

      const maxIteration = result[0].maxIteration;

      connection.query(
        `
        SELECT videos.video_id, videos.MaxDate, videos_all.viewes AS totalViews 
        FROM (
          SELECT video_id, MAX(curr_datetime) AS MaxDate, MIN(iteration) AS MinIteration
          FROM videos_updates
          WHERE processed_flag = 0
          GROUP BY video_id
        ) AS videos
        LEFT JOIN videos_all ON videos.video_id = videos_all.id
        WHERE videos.video_id NOT IN (
          SELECT video_id FROM videos_updates WHERE iteration = ?
        )
        ORDER BY
          CASE
            WHEN videos.MaxDate IS NOT NULL THEN videos_all.viewes / (TIMESTAMPDIFF(DAY, videos.MaxDate, NOW()) + 1) 
            ELSE 0
          END DESC, 
          videos_all.viewes DESC,
          videos.MinIteration ASC,
          videos.MaxDate ASC
        LIMIT 1;
        `,
        [maxIteration],
        async (error, results) => {
          if (error) {
            console.error(
              `Помилка при виборці списку відео з бази даних:`,
              error
            );
            return;
          }

          for (let i = 0; i < results.length; i++) {
            const video = results[i];

            const videoIdYouTube = video.video_id;

            console.log(`ID ВІДЕО: ${videoIdYouTube}`);

            console.log(
              `Оновлюємо відео ${i + 1} з ${
                results.length
              }: videoId ${videoIdYouTube}`
            );

            await addUpdate(videoIdYouTube);
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }
      );
    }
  );
}

async function runUpdateProcess() {
  while (true) {
    try {
      console.log("Starting update process");
      await updateAllVideos();
    } catch (error) {
      console.error(`An error occurred during the update process:`, error);
      console.log("Restarting update process");
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

console.log("Starting update process");

runUpdateProcess();
