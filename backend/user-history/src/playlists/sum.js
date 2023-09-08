// const { db } = require("../model/dbConnection");

// function getVideoIds(callback) {
//   const query =
//     "SELECT new_video_id, old_video_id FROM playlists_content_updates";
//   db.query(query, function (err, result) {
//     if (err) {
//       callback(err, null, null);
//       return;
//     }

//     const newVideoIds = [];
//     const oldVideoIds = [];

//     for (const row of result) {
//       newVideoIds.push(row.new_video_id);
//       oldVideoIds.push(row.old_video_id);
//     }
//     console.log(newVideoIds);
//     callback(null, newVideoIds, oldVideoIds);
//   });
// }

// const newVideoIds = [];
// const oldVideoIds = [];

// getVideoIds(function (err, newIds, oldIds) {
//   if (err) {
//     console.error("Сталася помилка:", err);
//     return;
//   }

//   newVideoIds.push(...newIds);
//   oldVideoIds.push(...oldIds);
// });

// module.exports = {
//   getVideoIds,
// };
function sum(a, b) {
  return a + b;
}

module.exports = sum;
