////////////////////////////////////////// ORIGIN //////////////////////////////
const fs = require("fs");
const { db } = require("../../db");

async function getPlaylistUpdates(oldList, newList, playlistId, table_name) {
  let unchanged = [];
  let reordered = [];
  let added = [];
  let deleted = [];
  let replaced = [];

  const { playlists_content_updates } = table_name;

  let oldMap = new Map(oldList.map((item, index) => [item, index]));
  let newMap = new Map(newList.map((item, index) => [item, index]));

  let getIterationQuery = `SELECT IFNULL(MAX(iteration), 0) as maxIteration FROM ${playlists_content_updates} WHERE playlist_id = ?`;

  const getIteration = new Promise((resolve, reject) => {
    db.query(getIterationQuery, [playlistId], (err, results) => {
      if (err) reject(err);
      resolve(results[0].maxIteration);
    });
  });

  let iteration = await getIteration;
  iteration += 1;

  for (let [id, order] of oldMap) {
    if (newMap.has(id)) {
      if (newMap.get(id) === order) {
        unchanged.push(id);
      } else {
        reordered.push({
          oldOrder: order,
          newOrder: newMap.get(id),
          oldVideoId: id,
          newVideoId: id,
          iteration: iteration,
        });
      }
    } else {
      deleted.push({
        videoId: id,
        iteration: iteration,
      });
    }
  }

  for (let [id, order] of newMap) {
    if (!oldMap.has(id)) {
      added.push({
        videoId: id,
        iteration: iteration,
      });
    }
  }

  let results = { unchanged, reordered, added, deleted, replaced };

  for (let item of reordered) {
    let query = `INSERT INTO ${playlists_content_updates} (playlist_id, old_order, new_order, old_video_id, new_video_id, iteration)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(
      query,
      [
        playlistId,
        item.oldOrder,
        item.newOrder,
        item.oldVideoId,
        item.newVideoId,
        item.iteration,
      ],
      (err, results) => {
        if (err) throw err;
      }
    );
  }

  for (let item of deleted) {
    let query = `INSERT INTO ${playlists_content_updates} (playlist_id, old_order, old_video_id, iteration)
                   VALUES (?, ?, ?, ?)`;
    db.query(
      query,
      [playlistId, oldMap.get(item.videoId), item.videoId, item.iteration],
      (err, results) => {
        if (err) throw err;
      }
    );
  }

  for (let item of added) {
    let query = `INSERT INTO ${playlists_content_updates} (playlist_id, new_order, new_video_id, iteration)
                   VALUES (?, ?, ?, ?)`;
    db.query(
      query,
      [playlistId, newMap.get(item.videoId), item.videoId, item.iteration],
      (err, results) => {
        if (err) throw err;
      }
    );
  }

  fs.writeFile(
    `./src/new_analize/archive/${playlistId}.json`,
    JSON.stringify(results, null, 2),
    (err) => {
      if (err) {
        console.error("Error while writing results:", err);
      } else {
        console.log("Results successfully written to results.json");
      }
    }
  );

  return results;
}

module.exports = getPlaylistUpdates;

// ////////////////////////////////////////// TEST /////////////////////////////////

// const fs = require("fs");
// const { db } = require("../../db");

// async function getPlaylistUpdates(oldList, newList, playlistId) {
//   let unchanged = [];
//   let reordered = [];
//   let added = [];
//   let deleted = [];
//   let replaced = [];

//   let oldMap = new Map(oldList.map((item, index) => [item, index]));
//   let newMap = new Map(newList.map((item, index) => [item, index]));

//   let getIterationQuery = `SELECT IFNULL(MAX(iteration), 0) as maxIteration FROM test_playlists_content_updates WHERE playlist_id = ?`;

//   const getIteration = new Promise((resolve, reject) => {
//     db.query(getIterationQuery, [playlistId], (err, results) => {
//       if (err) reject(err);
//       resolve(results[0].maxIteration);
//     });
//   });

//   let iteration = await getIteration;
//   iteration += 1;

//   for (let [id, order] of oldMap) {
//     if (newMap.has(id)) {
//       if (newMap.get(id) === order) {
//         unchanged.push(id);
//       } else {
//         reordered.push({
//           oldOrder: order,
//           newOrder: newMap.get(id),
//           oldVideoId: id,
//           newVideoId: id,
//           iteration: iteration,
//         });
//       }
//     } else {
//       deleted.push({
//         videoId: id,
//         iteration: iteration,
//       });
//     }
//   }

//   for (let [id, order] of newMap) {
//     if (!oldMap.has(id)) {
//       added.push({
//         videoId: id,
//         iteration: iteration,
//       });
//     }
//   }

//   let results = { unchanged, reordered, added, deleted, replaced };

//   for (let item of reordered) {
//     let query = `INSERT INTO test_playlists_content_updates (playlist_id, old_order, new_order, old_video_id, new_video_id, iteration)
//                    VALUES (?, ?, ?, ?, ?, ?)`;
//     db.query(
//       query,
//       [
//         playlistId,
//         item.oldOrder,
//         item.newOrder,
//         item.oldVideoId,
//         item.newVideoId,
//         item.iteration,
//       ],
//       (err, results) => {
//         if (err) throw err;
//       }
//     );
//   }

//   for (let item of deleted) {
//     let query = `INSERT INTO test_playlists_content_updates (playlist_id, old_order, old_video_id, iteration)
//                    VALUES (?, ?, ?, ?)`;
//     db.query(
//       query,
//       [playlistId, oldMap.get(item.videoId), item.videoId, item.iteration],
//       (err, results) => {
//         if (err) throw err;
//       }
//     );
//   }

//   for (let item of added) {
//     let query = `INSERT INTO test_playlists_content_updates (playlist_id, new_order, new_video_id, iteration)
//                    VALUES (?, ?, ?, ?)`;
//     db.query(
//       query,
//       [playlistId, newMap.get(item.videoId), item.videoId, item.iteration],
//       (err, results) => {
//         if (err) throw err;
//       }
//     );
//   }

//   fs.writeFile(
//     `./src/new_analize/archive/${playlistId}.json`,
//     JSON.stringify(results, null, 2),
//     (err) => {
//       if (err) {
//         console.error("Error while writing results:", err);
//       } else {
//         console.log("Results successfully written to results.json");
//       }
//     }
//   );

//   return results;
// }

// module.exports = getPlaylistUpdates;
