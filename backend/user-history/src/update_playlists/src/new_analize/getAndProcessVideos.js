////////////////////////////////////////// ORIGIN //////////////////////////////

const { db } = require("../../db");
const getPlaylistUpdates = require("./getPlaylistUpdates");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAndProcessVideos(playlists, table_name) {
  const { playlists_all, playlists_content, all_table, ids } = table_name;

  let playlistQuery = `SELECT playlist_id, sort FROM ${playlists_all}`;
  let oldListQuery = `SELECT video_id FROM ${playlists_content} WHERE playlist_id = ?`;

  try {
    const playlistResult = await new Promise((resolve, reject) => {
      db.query(playlistQuery, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    for (let i = 0; i < playlistResult.length; i++) {
      let playlist = playlistResult[i];
      let topX = playlists[i].topX;
      try {
        const oldListResult = await new Promise((resolve, reject) => {
          db.query(oldListQuery, [playlist.playlist_id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });

        await delay(3000); // Затримка 3 секунди
        let newListQuery = `SELECT ${ids} FROM ${all_table} ORDER BY ${playlist.sort} DESC LIMIT ${topX}`;
        const newListResult = await new Promise((resolve, reject) => {
          db.query(newListQuery, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });

        let oldList = oldListResult.map((row) => row.video_id);
        let newList = newListResult.map((row) => row[ids]);

        console.log(`old ${oldList}`);
        console.log(`new ${newList}`);
        console.log(playlist.playlist_id);

        await getPlaylistUpdates(
          oldList,
          newList,
          playlist.playlist_id,
          table_name
        );
        await delay(5000); // Затримка 5 секунд між плейлистами
      } catch (error) {
        console.error("Error processing playlist:", error);
      }
    }
  } catch (err) {
    console.error("Error retrieving playlists:", err);
  }
}

module.exports = {
  getAndProcessVideos,
};

/////////////////////////// TEST ////////////////////

// const { db } = require("../../db");
// const fs = require("fs");
// const getPlaylistUpdates = require("./getPlaylistUpdates");

// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function getAndProcessVideos(playlists) {
//   let playlistQuery = "SELECT playlist_id, sort FROM test_playlists";
//   let oldListQuery =
//     "SELECT video_id FROM test_playlists_content WHERE playlist_id = ?";

//   try {
//     const playlistResult = await new Promise((resolve, reject) => {
//       db.query(playlistQuery, (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       });
//     });

//     for (let i = 0; i < playlistResult.length; i++) {
//       let playlist = playlistResult[i];
//       let topX = playlists[i].topX;
//       try {
//         const oldListResult = await new Promise((resolve, reject) => {
//           db.query(oldListQuery, [playlist.playlist_id], (err, result) => {
//             if (err) reject(err);
//             else resolve(result);
//           });
//         });

//         await delay(3000); // Затримка 3 секунди
//         let newListQuery = `SELECT id FROM videos_all ORDER BY ${playlist.sort} DESC LIMIT ${topX}`;
//         const newListResult = await new Promise((resolve, reject) => {
//           db.query(newListQuery, (err, result) => {
//             if (err) reject(err);
//             else resolve(result);
//           });
//         });

//         let oldList = oldListResult.map((row) => row.video_id);
//         let newList = newListResult.map((row) => row.id);

//         console.log(oldList);
//         console.log(newList);
//         console.log(playlist.playlist_id);

//         await getPlaylistUpdates(oldList, newList, playlist.playlist_id);
//         await delay(5000); // Затримка 5 секунд між плейлистами
//       } catch (error) {
//         console.error("Error processing playlist:", error);
//       }
//     }
//   } catch (err) {
//     console.error("Error retrieving test_playlists:", err);
//   }
// }

// module.exports = {
//   getAndProcessVideos,
// };

///////////////////////////// ORIGIN ////////////////////
