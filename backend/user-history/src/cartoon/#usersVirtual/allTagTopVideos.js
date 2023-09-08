// const fs = require("fs");
// const { google } = require("googleapis");
// const insertDataFromFile = require('./addVideoIdDB')

// const arrKey = [''];
// const apiKeyArr = arrKey;
// let apiKeyIndex = 0;

// let youtube = google.youtube({
//   version: "v3",
//   auth: apiKeyArr[apiKeyIndex],
// });

// let uniqueVideoIds = [];

// async function saveVideoIdsToFile(videoIds, fileName) {
//   const content = videoIds.join("\n") + "\n" + videoIds.length;
//   fs.writeFileSync(fileName, content);
//   console.log(`Ідентифікатори відео збережено у файлі ${fileName}`);
// }

// async function getTopVideos(iteration) {
//   let newVideoIds = [];
//   let nextPageToken = "";
//   const latinHashtag = "most_viewed"
//   const sortBy = "viewCount";
//   const jsonFileName = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/most_viewed/uniqueVideoIds.json`;

//   const publishedBefore = new Date().toISOString();
//   const publishedAfter = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Наприклад, 24 години тому
//   if (fs.existsSync(jsonFileName)) {
//     uniqueVideoIds = JSON.parse(fs.readFileSync(jsonFileName));
//   }

//   while (true) {
//     try {
//       let queryParameters = {
//         part: "snippet",
//         maxResults: 50,
//         type: "video",
//         pageToken: nextPageToken,
//         order: sortBy,
//       };

//       const response = await youtube.search.list(queryParameters);
//       const videos = response.data.items;

//       for (const video of videos) {
//         const videoId = video.id.videoId;

//         if (!uniqueVideoIds.includes(videoId)) {
//           uniqueVideoIds.push(videoId);
//           newVideoIds.push(videoId);
//         }
//       }

//       if (!response.data.nextPageToken) {
//         break;
//       }

//       nextPageToken = response.data.nextPageToken;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const fileNameAll = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/most_viewed/all_${iteration}.txt`;
//   const fileNameNew = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/most_viewed/new_${iteration}.txt`;

//   await saveVideoIdsToFile(uniqueVideoIds, fileNameAll);
//   await saveVideoIdsToFile(newVideoIds, fileNameNew);

//   fs.writeFileSync(jsonFileName, JSON.stringify(uniqueVideoIds, null, 2));

//   await insertDataFromFile(latinHashtag,publishedBefore,publishedAfter )
// }

// async function main() {
//   let iteration = 1;
//   const ITERATION_FILE = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/iteration_files/most_viewed.txt`;

//   if (fs.existsSync(ITERATION_FILE)) {
//     iteration = parseInt(fs.readFileSync(ITERATION_FILE));
//   }

//   while (true) {
//     console.log(`Розпочинається ітерація ${iteration} для топ відео`);
//     try {
//       await getTopVideos(iteration);
//       await new Promise((resolve) => setTimeout(resolve, 10000)); // Затримка 10 секунд
//     } catch (error) {
//       console.log("Сталася помилка:", error.message);
//     }
//     iteration++;
//     fs.writeFileSync(ITERATION_FILE, iteration.toString());
//   }
// }

// main();

//////////////////////

const fs = require("fs");
const { google } = require("googleapis");
const insertDataFromFile = require("./addVideoIdDB");
require("dotenv").config();
const { KEY } = process.env;

const arrKey = [KEY];
const apiKeyArr = arrKey;
let apiKeyIndex = 0;

let youtube = google.youtube({
  version: "v3",
  auth: apiKeyArr[apiKeyIndex],
});

let uniqueVideoIds = [];

async function saveVideoIdsToFile(videoIds, fileName) {
  const content = videoIds.join("\n") + "\n" + videoIds.length;
  fs.writeFileSync(fileName, content);
  console.log(`Ідентифікатори відео збережено у файлі ${fileName}`);
}

async function getTopVideos(iteration) {
  let newVideoIds = [];
  let nextPageToken = "";
  const latinHashtag = "most_viewed";
  const sortBy = "viewCount";
  const jsonFileName = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/most_viewed/uniqueVideoIds.json`;

  const publishedBefore = new Date().toISOString();
  const publishedAfter = new Date(
    Date.now() - 24 * 60 * 60 * 1000
  ).toISOString(); // Наприклад, 24 години тому
  if (fs.existsSync(jsonFileName)) {
    uniqueVideoIds = JSON.parse(fs.readFileSync(jsonFileName));
  }

  while (true) {
    try {
      let queryParameters = {
        part: "snippet",
        maxResults: 50,
        type: "video",
        pageToken: nextPageToken,
        order: sortBy,
      };

      const response = await youtube.search.list(queryParameters);
      const videos = response.data.items;

      for (const video of videos) {
        const videoId = video.id.videoId;

        if (!uniqueVideoIds.includes(videoId)) {
          uniqueVideoIds.push(videoId);
          newVideoIds.push(videoId);
        }
      }

      if (!response.data.nextPageToken) {
        break;
      }

      nextPageToken = response.data.nextPageToken;
    } catch (error) {
      console.error(error);
    }
  }

  const fileNameAll = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/most_viewed/all_${iteration}.txt`;
  const fileNameNew = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/most_viewed/new_${iteration}.txt`;

  await saveVideoIdsToFile(uniqueVideoIds, fileNameAll);
  await saveVideoIdsToFile(newVideoIds, fileNameNew);

  fs.writeFileSync(jsonFileName, JSON.stringify(uniqueVideoIds, null, 2));

  await insertDataFromFile(latinHashtag, publishedBefore, publishedAfter);
}

async function main() {
  let iteration = 1;
  const ITERATION_FILE = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/iteration_files/most_viewed.txt`;

  if (fs.existsSync(ITERATION_FILE)) {
    iteration = parseInt(fs.readFileSync(ITERATION_FILE));
  }

  while (true) {
    console.log(`Розпочинається ітерація ${iteration} для топ відео`);
    try {
      await getTopVideos(iteration);
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Затримка 10 секунд
    } catch (error) {
      console.log("Сталася помилка:", error.message);
    }
    iteration++;
    fs.writeFileSync(ITERATION_FILE, iteration.toString());
  }
}

main();
