const axios = require("axios");
const fs = require("fs").promises;
const { db } = require("../../model/dbConnection");

require("dotenv").config();
const { KEY33, KEY331, KEYMAX, KEYTINA } = process.env;

async function fetchChannelsFromDB() {
  console.log("Fetching channels from DB...");
  return new Promise((resolve, reject) => {
    const query = `
      SELECT a.*
      FROM all_channels a
      WHERE a.view_count > 1 AND a.video_count > 0 AND a.save_videos = 0
      ORDER BY (a.view_count / a.video_count) DESC
      LIMIT 1000;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching channels:", error);
        reject(error);
      } else {
        console.log(`Fetched ${results.length} channels from DB.`);
        resolve(results);
      }
    });
  });
}

async function updateDBAfterChannelProcessing(channelId) {
  console.log(`Updating DB for channel ID: ${channelId}`);
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE all_channels
      SET save_videos = 1, date_save_videos = NOW()
      WHERE channel_id = ?
    `;

    db.query(query, [channelId], (error, results) => {
      if (error) {
        console.error("Error updating DB:", error);
        reject(error);
      } else {
        console.log(`Updated DB for channel ID: ${channelId}`);
        resolve(results);
      }
    });
  });
}

async function appendChannelDataToFile(videoDetails) {
  console.log("Appending channel data to file...");
  let existingData = [];

  try {
    existingData = JSON.parse(
      await fs.readFile(
        "/Users/andrijkozevnikov/Documents/ProjectYoutube/VirtualUsers/videos_user_17.json",
        "utf8"
      )
    );
    console.log("Existing data read successfully.");
  } catch (error) {
    console.warn("Could not read the existing file. New file will be created.");
  }

  const combinedData = existingData.concat(videoDetails);
  await fs.writeFile(
    "/Users/andrijkozevnikov/Documents/ProjectYoutube/VirtualUsers/videos_user_17.json",
    JSON.stringify(combinedData, null, 2)
  );
  console.log("Channel data appended successfully.");
}

async function makeRequestWithRetry(
  channelId,
  API_KEY,
  pageToken = null,
  retries = 5,
  delay = 60000
) {
  try {
    const params = {
      key: API_KEY,
      channelId: channelId,
      part: "snippet,id",
      order: "date",
      maxResults: 50,
    };
    if (pageToken) params.pageToken = pageToken;

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      { params }
    );
    return response;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.code === 403 &&
      retries > 0
    ) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return makeRequestWithRetry(
        channelId,
        API_KEY,
        pageToken,
        retries - 1,
        delay
      );
    }

    throw error;
  }
}

async function saveChannelData(channelId, API_KEY) {
  let pageToken;
  let videoDetails = [];

  do {
    const response = await makeRequestWithRetry(channelId, API_KEY, pageToken);

    videoDetails = videoDetails.concat(
      response.data.items
        .filter((item) => item.id.kind === "youtube#video")
        .map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          titleUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          timeDate: new Date(item.snippet.publishedAt).toString(),
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
        }))
    );

    pageToken = response.data.nextPageToken;
  } while (pageToken !== undefined);

  await appendChannelDataToFile(videoDetails);
  await updateDBAfterChannelProcessing(channelId);
  console.log("Details saved for channel:", channelId);
}

(async () => {
  const API_KEY = KEY33; // замініть на ваш API ключ

  try {
    const channels = await fetchChannelsFromDB();

    for (const channel of channels) {
      await saveChannelData(channel.channel_id, API_KEY);
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
