// ============================================ РОБОЧИЙ ПО ЧАСУ ========================================

// const mysql = require("mysql");
// const axios = require("axios");
// require("dotenv").config();

// const { HOST, USER, DATABASE, PASSWORD } = process.env;

// const connection = mysql.createConnection({
//   host: HOST,
//   user: "root",
//   database: DATABASE,
//   password: PASSWORD,
//   charset: "utf8mb4",
// });

// async function addUpdate(videoIdYouTube) {
//   console.log(`Fetching data for videoId: ${videoIdYouTube}`);

//   let youtubeResponse;
//   let success = false;

//   while (!success) {
//     try {
//       youtubeResponse = await axios.get(
//         `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIdYouTube}&key=`
//       );
//       success = true;
//     } catch (error) {
//       console.error(
//         `An error occurred while fetching videoId ${videoIdYouTube}: ${error}`
//       );
//       console.log(`Retrying request for videoId ${videoIdYouTube}`);
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Затримка перед наступною спробою
//     }
//   }

//   const currDatetime = new Date();

//   let newViews = null;
//   let newLikes = null;

//   if (youtubeResponse.data.items && youtubeResponse.data.items.length > 0) {
//     newViews = parseInt(youtubeResponse.data.items[0].statistics.viewCount);
//     newLikes = parseInt(youtubeResponse.data.items[0].statistics.likeCount);
//     console.log(
//       `Statistics for videoId ${videoIdYouTube}: views = ${newViews}, likes = ${newLikes}`
//     );
//   } else {
//     console.log(`Cannot get statistics for videoId ${videoIdYouTube}`);
//   }

//   if (isNaN(newViews)) newViews = null;
//   if (isNaN(newLikes)) newLikes = null;

//   return new Promise((resolve, reject) => {
//     connection.query(
//       `SELECT * FROM videos_updates WHERE video_id = ? ORDER BY curr_datetime DESC LIMIT 1`,
//       [videoIdYouTube],
//       function (error, results) {
//         if (error) {
//           console.error(
//             `Error fetching data from database for videoId ${videoIdYouTube}:`,
//             error
//           );
//           reject();
//         }

//         const prevUpdate = results[0];
//         const prevDatetime = prevUpdate ? prevUpdate.curr_datetime : null;
//         const prevViews = prevUpdate ? prevUpdate.curr_views : 0;
//         const prevLikes = prevUpdate ? prevUpdate.curr_likes : 0;
//         const prevIteration = prevUpdate ? prevUpdate.iteration : 0;

//         const newIteration = prevIteration + 1;

//         const diffSeconds = (currDatetime - new Date(prevDatetime)) / 1000;
//         const diffViews =
//           newViews !== null && prevViews !== null ? newViews - prevViews : null;
//         const diffLikes =
//           newLikes !== null && prevLikes !== null ? newLikes - prevLikes : null;

//         const viewsPerSecond =
//           diffViews !== null && diffSeconds > 0
//             ? Number((diffViews / diffSeconds).toFixed(6))
//             : null;
//         const likesPerSecond =
//           diffLikes !== null && diffSeconds > 0
//             ? Number((diffLikes / diffSeconds).toFixed(6))
//             : null;

//         connection.query(
//           `UPDATE videos_all SET views_per_second = ?, likes_per_second = ?, viewes = ?, okLike = ? WHERE id = ?`,
//           [viewsPerSecond, likesPerSecond, newViews, newLikes, videoIdYouTube],
//           function (error) {
//             if (error) {
//               console.error(
//                 `Error updating data for videoId ${videoIdYouTube}:`,
//                 error
//               );
//             } else {
//               console.log(
//                 `Successfully updated data for videoId ${videoIdYouTube}`
//               );
//             }
//           }
//         );

//         connection.query(
//           `INSERT INTO videos_updates (iteration, video_id, prev_datetime, prev_views, prev_likes, curr_datetime, curr_views, curr_likes, diff_seconds, diff_views, diff_likes, views_per_second, likes_per_second) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//           [
//             newIteration,
//             videoIdYouTube,
//             prevDatetime,
//             prevViews,
//             prevLikes,
//             currDatetime,
//             newViews,
//             newLikes,
//             diffSeconds,
//             diffViews,
//             diffLikes,
//             viewsPerSecond,
//             likesPerSecond,
//           ],
//           function (error) {
//             if (error) {
//               console.error(
//                 `Error inserting data for videoId ${videoIdYouTube}:`,
//                 error
//               );
//             } else {
//               console.log(
//                 `Successfully inserted data for videoId ${videoIdYouTube}`
//               );
//               console.log(
//                 "===================================================="
//               );
//               console.log(
//                 "===================================================="
//               );

//               console.log(
//                 "===================================================="
//               );
//             }
//             resolve();
//           }
//         );
//       }
//     );
//   });
// }

// async function updateAllVideos() {
//   connection.query(
//     `SELECT
//     video_id,
//     MAX(curr_datetime) AS MaxDate
// FROM
//     videos_updates
// GROUP BY
//     video_id
// ORDER BY
//     MaxDate ASC
// `,
//     async function (error, results) {
//       if (error) {
//         console.error(`Error fetching videos list from database:`, error);
//         return;
//       }

//       for (let i = 0; i < results.length; i++) {
//         const videoIdYouTube = results[i].video_id;
//         console.log(`ID VIDEO: ${videoIdYouTube}`);

//         console.log(
//           `Updating video ${i + 1} of ${
//             results.length
//           }: videoId ${videoIdYouTube}`
//         );
//         await addUpdate(videoIdYouTube);
//         await new Promise((resolve) => setTimeout(resolve, 3000));
//       }
//     }
//   );
// }

// async function runUpdateProcess() {
//   let success = false;
//   while (!success) {
//     try {
//       console.log("Starting update process");
//       await updateAllVideos();
//       success = true;
//     } catch (error) {
//       console.error(`An error occurred during the update process:`, error);
//       console.log("Restarting update process");
//     }
//   }
// }
// console.log("Starting update process");

// runUpdateProcess();

//////// ==================================================================================================

// const axios = require("axios");
// const { db } = require("../model/dbConnection");
// const mysql = require("mysql");

// async function updateVideoData(videoId) {
//   try {
//     const youtubeResponse = await axios.get(
//       `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=`
//     );

//     if (youtubeResponse.data.items && youtubeResponse.data.items.length > 0) {
//       let newViews = youtubeResponse.data.items[0].statistics.viewCount;
//       let newLikes = youtubeResponse.data.items[0].statistics.likeCount;

//       // Замінюємо NaN на null
//       if (isNaN(newViews)) newViews = null;
//       if (isNaN(newLikes)) newLikes = null;

//       db.query(
//         `SELECT * FROM videos_updates WHERE video_id = ? AND updates = 0 ORDER BY views_per_second IS NULL DESC, curr_views DESC`,
//         [videoId],
//         function (error, results, fields) {
//           if (error) throw error;
//           if (results.length > 0) {
//             const prevDatetime = results[0].curr_datetime;
//             const prevViews = results[0].curr_views;
//             const prevLikes = results[0].curr_likes;

//             const diffViews = newViews - prevViews;
//             const diffLikes = newLikes - prevLikes;

//             const currDatetime = new Date();
//             const diffSeconds = (currDatetime - new Date(prevDatetime)) / 1000;

//             const viewsPerSecond =
//               diffViews !== 0
//                 ? Number((diffViews / diffSeconds).toFixed(6))
//                 : null;
//             const likesPerSecond =
//               diffLikes !== 0
//                 ? Number((diffLikes / diffSeconds).toFixed(6))
//                 : null;

//             db.query(
//               `
//               UPDATE videos_updates
//               SET
//                 prev_datetime = ?,
//                 prev_views = ?,
//                 prev_likes = ?,
//                 curr_datetime = ?,
//                 curr_views = ?,
//                 curr_likes = ?,
//                 diff_seconds = ?,
//                 diff_views = ?,
//                 diff_likes = ?,
//                 views_per_second = ?,
//                 likes_per_second = ?,
//                 updates = 1
//               WHERE video_id = ? AND updates = 0`,
//               [
//                 prevDatetime,
//                 prevViews,
//                 prevLikes,
//                 mysql.raw("NOW()"),
//                 newViews,
//                 newLikes,
//                 diffSeconds,
//                 diffViews,
//                 diffLikes,
//                 viewsPerSecond,
//                 likesPerSecond,
//                 videoId,
//               ],
//               function (error, results, fields) {
//                 if (error) throw error;
//                 console.log(`Updated ${videoId} successfully!`);

//                 // Оновлення таблиці video_all
//                 db.query(
//                   `
//                   UPDATE videos_all
//                   SET
//                     viewes = ?,
//                     okLike = ?,
//                     views_per_second = ?,
//                     likes_per_second = ?
//                   WHERE id = ?`,
//                   [newViews, newLikes, viewsPerSecond, likesPerSecond, videoId],
//                   function (error, results, fields) {
//                     if (error) throw error;
//                     console.log(`Updated video_all ${videoId}  successfully!`);
//                     processNextVideo();
//                   }
//                 );
//               }
//             );
//           } else {
//             console.log("No updates required.");
//             processNextVideo();
//           }
//         }
//       );
//     } else {
//       console.error("No data returned from YouTube API for videoId:", videoId);
//       markVideoAsUpdated(videoId);
//     }
//   } catch (error) {
//     console.error(`Error: ${error}`);
//     processNextVideo();
//   }
// }

// function markVideoAsUpdated(videoId) {
//   db.query(
//     `UPDATE videos_updates SET updates = 1 WHERE video_id = ?`,
//     [videoId],
//     function (error, results, fields) {
//       if (error) throw error;
//       console.log(
//         `Video with id ${videoId} marked as updated because it is unavailable.`
//       );
//       processNextVideo(); // перейти до наступного відео
//     }
//   );
// }

// let videoIds = [];

// function processNextVideo() {
//   if (videoIds.length > 0) {
//     const videoId = videoIds.shift();
//     setTimeout(() => {
//       updateVideoData(videoId);
//     }, 10000);
//   } else {
//     waitForNewVideos();
//   }
// }

// function waitForNewVideos() {
//   db.query(
//     `SELECT video_id FROM videos_updates WHERE updates = 0 ORDER BY views_per_second IS NULL DESC, curr_views DESC`,
//     function (error, results, fields) {
//       if (error) throw error;
//       if (results.length > 0) {
//         for (let i = 0; i < results.length; i++) {
//           videoIds.push(results[i].video_id);
//         }
//         processNextVideo();
//       } else {
//         setTimeout(waitForNewVideos, 10000);
//       }
//     }
//   );
// }

// waitForNewVideos();

/////////////////////////////
// const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "your_username",
//   password: "your_password",
//   database: "your_database",
// });

// // Функція для додавання нового оновлення
// function addUpdate(videoId, currDatetime, currViews, currLikes) {
//   // Отримуємо останнє оновлення
//   connection.query(
//     `SELECT * FROM videos_updates WHERE video_id = ? ORDER BY curr_datetime DESC LIMIT 1`,
//     [videoId],
//     function (error, results) {
//       if (error) {
//         console.error(error);
//         return;
//       }

//       const prevUpdate = results[0];
//       const prevDatetime = prevUpdate ? prevUpdate.curr_datetime : null;
//       const prevViews = prevUpdate ? prevUpdate.curr_views : 0;
//       const prevLikes = prevUpdate ? prevUpdate.curr_likes : 0;

//       const diffSeconds =
//         (new Date(currDatetime) - new Date(prevDatetime)) / 1000;
//       const diffViews = currViews - prevViews;
//       const diffLikes = currLikes - prevLikes;

//       const viewsPerSecond = diffViews / diffSeconds;
//       const likesPerSecond = diffLikes / diffSeconds;

//       // Додаємо новий запис в таблицю
//       connection.query(
//         `INSERT INTO videos_updates (video_id, prev_datetime, prev_views, prev_likes, curr_datetime, curr_views, curr_likes, diff_seconds, diff_views, diff_likes, views_per_second, likes_per_second) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           videoId,
//           prevDatetime,
//           prevViews,
//           prevLikes,
//           currDatetime,
//           currViews,
//           currLikes,
//           diffSeconds,
//           diffViews,
//           diffLikes,
//           viewsPerSecond,
//           likesPerSecond,
//         ],
//         function (error) {
//           if (error) {
//             console.error(error);
//           }
//         }
//       );
//     }
//   );
// }

// // Отримуємо нове оновлення
// const videoId = 1;
// const currDatetime = "2023-07-22 12:00:00";
// const currViews = 300;
// const currLikes = 30;

// addUpdate(videoId, currDatetime, currViews, currLikes);

/////////////////////////////// 25/07/23  додає ітерації

// const mysql = require("mysql");
// const axios = require("axios");
// require("dotenv").config();

// const { HOST, USER, DATABASE, PASSWORD } = process.env;

// const connection = mysql.createConnection({
//   host: HOST,
//   user: "root",
//   database: DATABASE,
//   password: PASSWORD,
//   charset: "utf8mb4",
// });

// async function addUpdate(videoIdYouTube) {
//   const youtubeResponse = await axios.get(
//     `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIdYouTube}&key=`
//   );

//   const currDatetime = new Date();

//   let newViews = null;
//   let newLikes = null;

//   if (youtubeResponse.data.items && youtubeResponse.data.items.length > 0) {
//     newViews = parseInt(youtubeResponse.data.items[0].statistics.viewCount);
//     newLikes = parseInt(youtubeResponse.data.items[0].statistics.likeCount);
//   } else {
//     console.log(`Cannot get statistics for videoId ${videoIdYouTube}`);
//   }

//   if (isNaN(newViews)) newViews = null;
//   if (isNaN(newLikes)) newLikes = null;

//   return new Promise((resolve, reject) => {
//     connection.query(
//       `SELECT * FROM videos_updates WHERE video_id = ? ORDER BY curr_datetime DESC LIMIT 1`,
//       [videoIdYouTube],
//       function (error, results) {
//         if (error) {
//           console.error(error);
//           reject();
//         }

//         const prevUpdate = results[0];
//         const prevDatetime = prevUpdate ? prevUpdate.curr_datetime : null;
//         const prevViews = prevUpdate ? prevUpdate.curr_views : 0;
//         const prevLikes = prevUpdate ? prevUpdate.curr_likes : 0;
//         const prevIteration = prevUpdate ? prevUpdate.iteration : 0;

//         const newIteration = prevIteration + 1;

//         const diffSeconds = (currDatetime - new Date(prevDatetime)) / 1000;
//         const diffViews =
//           newViews !== null && prevViews !== null ? newViews - prevViews : null;
//         const diffLikes =
//           newLikes !== null && prevLikes !== null ? newLikes - prevLikes : null;

//         const viewsPerSecond =
//           diffViews !== null && diffSeconds > 0
//             ? Number((diffViews / diffSeconds).toFixed(6))
//             : null;
//         const likesPerSecond =
//           diffLikes !== null && diffSeconds > 0
//             ? Number((diffLikes / diffSeconds).toFixed(6))
//             : null;

//         connection.query(
//           `UPDATE videos_all SET views_per_second = ?, likes_per_second = ?, viewes = ?, okLike = ? WHERE id = ?`,
//           [viewsPerSecond, likesPerSecond, newViews, newLikes, videoIdYouTube],
//           function (error) {
//             if (error) {
//               console.error(error);
//             }
//           }
//         );

//         connection.query(
//           `INSERT INTO videos_updates (iteration, video_id, prev_datetime, prev_views, prev_likes, curr_datetime, curr_views, curr_likes, diff_seconds, diff_views, diff_likes, views_per_second, likes_per_second) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//           [
//             newIteration,
//             videoIdYouTube,
//             prevDatetime,
//             prevViews,
//             prevLikes,
//             currDatetime,
//             newViews,
//             newLikes,
//             diffSeconds,
//             diffViews,
//             diffLikes,
//             viewsPerSecond,
//             likesPerSecond,
//           ],
//           function (error) {
//             if (error) {
//               console.error(error);
//             }
//             resolve();
//           }
//         );
//       }
//     );
//   });
// }

// async function updateAllVideos() {
//   connection.query(
//     `SELECT
//     video_id,
//     MAX(curr_datetime) AS MaxDate
// FROM
//     videos_updates
// GROUP BY
//     video_id
// ORDER BY
//     MaxDate ASC
// `,
//     async function (error, results) {
//       if (error) {
//         console.error(error);
//         return;
//       }

//       for (let i = 0; i < results.length; i++) {
//         const videoIdYouTube = results[i].video_id;
//         await addUpdate(videoIdYouTube);
//         await new Promise((resolve) => setTimeout(resolve, 9000));
//       }
//     }
//   );
// }

// updateAllVideos();
// async function updateAllVideos() {
//   connection.query(
//     `SELECT
//       video_id,
//       curr_datetime
//     FROM
//       videos_updates
//     WHERE
//       curr_datetime = (SELECT MIN(curr_datetime) FROM videos_updates)
//     `,
//     async function (error, results) {
//       if (error) {
//         console.error(error);
//         return;
//       }

//       const videoIdYouTube = results[0].video_id;
//       await addUpdate(videoIdYouTube);
//       await new Promise((resolve) => setTimeout(resolve, 9000));
//     }
//   );
// }
// const mysql = require("mysql");
// const axios = require("axios");
// require("dotenv").config();

// const { HOST, USER, DATABASE, PASSWORD } = process.env;

// const connection = mysql.createConnection({
//   host: HOST,
//   user: "root",
//   database: DATABASE,
//   password: PASSWORD,
//   charset: "utf8mb4",
// });

// async function addUpdate(videoIdYouTube) {
//   const youtubeResponse = await axios.get(
//     `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIdYouTube}&key=`
//   );

//   const currDatetime = new Date();

//   let newViews = null;
//   let newLikes = null;

//   if (youtubeResponse.data.items && youtubeResponse.data.items.length > 0) {
//     newViews = parseInt(youtubeResponse.data.items[0].statistics.viewCount);
//     newLikes = parseInt(youtubeResponse.data.items[0].statistics.likeCount);
//   } else {
//     console.log(`Cannot get statistics for videoId ${videoIdYouTube}`);
//   }

//   if (isNaN(newViews)) newViews = null;
//   if (isNaN(newLikes)) newLikes = null;

//   return new Promise((resolve, reject) => {
//     connection.query(
//       `SELECT * FROM videos_updates WHERE video_id = ? ORDER BY curr_datetime DESC LIMIT 1`,
//       [videoIdYouTube],
//       function (error, results) {
//         if (error) {
//           console.error(error);
//           reject();
//         }

//         const prevUpdate = results[0];
//         const prevDatetime = prevUpdate ? prevUpdate.curr_datetime : null;
//         const prevViews = prevUpdate ? prevUpdate.curr_views : 0;
//         const prevLikes = prevUpdate ? prevUpdate.curr_likes : 0;
//         const prevIteration = prevUpdate ? prevUpdate.iteration : 0;

//         const newIteration = prevIteration + 1;

//         const diffSeconds = (currDatetime - new Date(prevDatetime)) / 1000;
//         const diffViews =
//           newViews !== null && prevViews !== null ? newViews - prevViews : null;
//         const diffLikes =
//           newLikes !== null && prevLikes !== null ? newLikes - prevLikes : null;

//         const viewsPerSecond =
//           diffViews !== null && diffSeconds > 0
//             ? Number((diffViews / diffSeconds).toFixed(6))
//             : null;
//         const likesPerSecond =
//           diffLikes !== null && diffSeconds > 0
//             ? Number((diffLikes / diffSeconds).toFixed(6))
//             : null;

//         connection.query(
//           `UPDATE videos_all SET views_per_second = ?, likes_per_second = ?, viewes = ?, okLike = ? WHERE id = ?`,
//           [viewsPerSecond, likesPerSecond, newViews, newLikes, videoIdYouTube],
//           function (error) {
//             if (error) {
//               console.error(error);
//             }
//           }
//         );

//         connection.query(
//           `INSERT INTO videos_updates (iteration, video_id, prev_datetime, prev_views, prev_likes, curr_datetime, curr_views, curr_likes, diff_seconds, diff_views, diff_likes, views_per_second, likes_per_second) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//           [
//             newIteration,
//             videoIdYouTube,
//             prevDatetime,
//             prevViews,
//             prevLikes,
//             currDatetime,
//             newViews,
//             newLikes,
//             diffSeconds,
//             diffViews,
//             diffLikes,
//             viewsPerSecond,
//             likesPerSecond,
//           ],
//           function (error) {
//             if (error) {
//               console.error(error);
//             }
//             resolve();
//           }
//         );
//       }
//     );
//   });
// }

// async function updateAllVideos() {
//   connection.query(
//     `SELECT
//     video_id,
//     MAX(curr_datetime) AS MaxDate
// FROM
//     videos_updates
// GROUP BY
//     video_id
// ORDER BY
//     MaxDate ASC
// `,
//     async function (error, results) {
//       if (error) {
//         console.error(error);
//         return;
//       }

//       for (let i = 0; i < results.length; i++) {
//         const videoIdYouTube = results[i].video_id;
//         await addUpdate(videoIdYouTube);
//         await new Promise((resolve) => setTimeout(resolve, 9000));
//       }
//     }
//   );
// }

// updateAllVideos();
