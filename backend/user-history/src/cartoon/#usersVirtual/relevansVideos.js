const fs = require("fs");
const { db } = require("../../model/dbConnection");
const { google } = require("googleapis");
const transliteration = require("transliteration");
const addVirtualUser = require("../virtualUsrCartoon/addVirtualUser");
const insertDataFromFile = require("./addVideoIdDB");
const arrTag = require("./arrTag.json");

require("dotenv").config();
const { KEY32 } = process.env;
const arrKey = [KEY32];

const apiKeyArr = arrKey;
let apiKeyIndex = 0;

const hashtags = arrTag;

let youtube = google.youtube({
  version: "v3",
  auth: apiKeyArr[apiKeyIndex],
});

let uniqueVideoIds = [];
const ITERATION_FILE_BASE =
  "/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/iteration_files/";

function getRandomDatesOrNull(start) {
  const end = new Date();

  let publishedAfter = null;
  let publishedBefore = null;

  if (Math.random() < 0.5) {
    publishedAfter = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  if (Math.random() < 0.5) {
    publishedBefore = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  if (publishedAfter && publishedBefore && publishedAfter > publishedBefore) {
    [publishedAfter, publishedBefore] = [publishedBefore, publishedAfter];
  }
  console.log(`publishedAfter : ${publishedAfter}`);
  console.log(`publishedBefore: ${publishedBefore}`);

  return [publishedAfter, publishedBefore];
}

async function getChannelInfoByHashtags(hashtag, iteration, dates) {
  let newVideoIds = [];

  const sortBy = "relevance";
  let nextPageToken = "";
  const latinHashtag = transliteration.slugify(hashtag, { lowercase: true });
  const jsonFileName = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/${latinHashtag}/uniqueVideoIds.json`;
  const ITERATION_FILE = `${ITERATION_FILE_BASE}${latinHashtag}.txt`;

  const sqlQuery = `CREATE TABLE IF NOT EXISTS tag_${latinHashtag}(
    id INT AUTO_INCREMENT PRIMARY KEY,
    video_id VARCHAR(255) NOT NULL UNIQUE,
    addJson TINYINT DEFAULT 0,
    publishedBefore VARCHAR(45),
    publishedAfter VARCHAR(45),
    timeDate DATETIME
  )`;

  try {
    await new Promise((resolve, reject) => {
      db.query(sqlQuery, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    console.log("Таблиця успішно створена");
  } catch (err) {
    console.log("Таблиця вже існує", err);
  }

  console.log(`Таблиця`);
  try {
    addVirtualUser(latinHashtag);
  } catch (error) {
    console.log(error);
  }

  if (fs.existsSync(jsonFileName)) {
    uniqueVideoIds = JSON.parse(fs.readFileSync(jsonFileName));
  }

  const hashtagDir = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/${latinHashtag}`;

  if (!fs.existsSync(hashtagDir)) {
    fs.mkdirSync(hashtagDir);
  }

  while (true) {
    try {
      let queryParameters = {
        part: "snippet",
        maxResults: 50,
        q: `#${hashtag}`,
        type: "video",
        pageToken: nextPageToken,
        order: sortBy,
      };

      if (dates[0]) {
        queryParameters.publishedAfter = dates[0].toISOString();
      }

      if (dates[1]) {
        queryParameters.publishedBefore = dates[1].toISOString();
      }

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
      if (error.code === 403) {
        apiKeyIndex++;
        if (apiKeyIndex >= apiKeyArr.length) {
          apiKeyIndex = 0;
        }
        youtube.auth = apiKeyArr[apiKeyIndex];
      } else {
        console.error(error);
      }
    }
  }

  const fileNameAll = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/${latinHashtag}/all_${iteration}.txt`;
  const fileNameNew = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videoIdHashtag/${latinHashtag}/new_${iteration}.txt`;

  await saveVideoIdsToFile(uniqueVideoIds, fileNameAll);
  await saveVideoIdsToFile(newVideoIds, fileNameNew);

  fs.writeFileSync(jsonFileName, JSON.stringify(uniqueVideoIds, null, 2));

  await insertDataFromFile(
    latinHashtag,
    dates[0] ? dates[0].toISOString() : null,
    dates[1] ? dates[1].toISOString() : null
  );
  fs.writeFileSync(ITERATION_FILE, (iteration + 1).toString());
}

async function saveVideoIdsToFile(videoIds, fileName) {
  const content = videoIds.join("\n") + "\n" + videoIds.length;
  fs.writeFileSync(fileName, content);
  console.log(`Ідентифікатори відео збережено у файлі ${fileName}`);
}

async function main() {
  while (true) {
    for (const hashtag of hashtags) {
      const latinHashtag = transliteration.slugify(hashtag, {
        lowercase: true,
      });
      const ITERATION_FILE = `${ITERATION_FILE_BASE}${latinHashtag}.txt`;

      let iteration = 1;
      if (fs.existsSync(ITERATION_FILE)) {
        iteration = parseInt(fs.readFileSync(ITERATION_FILE));
      }

      console.log(
        `Розпочинається ітерація ${iteration} для хештегу ${hashtag}`
      );
      const dates = getRandomDatesOrNull(new Date("2005-04-23"));
      try {
        await getChannelInfoByHashtags(hashtag, iteration, dates);
        await new Promise((resolve) => setTimeout(resolve, 10000)); // delay for 10 seconds
      } catch (error) {
        console.log("Сталася помилка:", error.message);
      }
    }
  }
}

main();
