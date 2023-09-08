const fs = require("fs");

async function getPlaylistUpdates(oldList, newList, playlistId) {
  let unchanged = [];
  let reordered = [];
  let added = [];
  let deleted = [];
  let replaced = [];

  let oldMap = new Map(oldList.map((item, index) => [item, index]));
  let newMap = new Map(newList.map((item, index) => [item, index]));

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
        });
      }
    } else {
      deleted.push({
        oldOrder: order,
        oldVideoId: id,
      });
    }
  }

  for (let [id, order] of newMap) {
    if (!oldMap.has(id)) {
      added.push({
        newOrder: order,
        newVideoId: id,
      });
    }
  }

  // After having populated all other categories, handle replaced videos
  for (let [id, order] of newMap) {
    if (oldMap.has(id)) {
      const oldId = Array.from(oldMap.keys())[order];
      if (
        oldId !== id &&
        !unchanged.includes(oldId) &&
        !reordered.some(
          (item) => item.oldVideoId === oldId || item.newVideoId === id
        ) &&
        !deleted.some((item) => item.oldVideoId === oldId) &&
        !added.some((item) => item.newVideoId === id)
      ) {
        replaced.push({
          oldOrder: order,
          newOrder: order,
          oldVideoId: oldId,
          newVideoId: id,
        });
      }
    }
  }

  let results = { unchanged, reordered, added, deleted, replaced };

  fs.writeFileSync(
    `playlistUpdate_${playlistId}.json`,
    JSON.stringify(results)
  );

  return results;
}

let oldList = ["video1", "video2"];
let newList = ["video2", "video1"];

let playlistId = 1;
getPlaylistUpdates(oldList, newList, playlistId);
