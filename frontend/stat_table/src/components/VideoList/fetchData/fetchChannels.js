// // fetchChannels.js

// const fetchChannels = async (sortType, setVideos) => {
//   const limitMatch = sortType.match(/Top(\d+)_Channels/);
//   const limit = limitMatch ? limitMatch[1] : 10;

//   const orderParam = sortType.includes("Channels_Viewed")
//     ? "view_count"
//     : sortType.includes("Channels_Daily")
//     ? "views_per_second"
//     : sortType.includes("Channels_Videos")
//     ? "video_count"
//     : sortType.includes("Channels_AverageViews")
//     ? "average_views"
//     : "";

//   const title = "Top 10 Channels Viewed";

//   const url = `http://localhost:3000/api/all_channels?title=${title}&limit=${limit}&orderBy=${orderParam}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     setVideos(data.playlist || []);
//   } catch (error) {
//     console.error("Помилка отримання каналів:", error);
//   }
// };

// export default fetchChannels;

import axios from "axios";

const fetchChannels = async (sortType, setVideos) => {
  let url;
  let title;
  let limit;
  let orderParam;

  switch (sortType) {
    case "Top10_Channels_Viewed":
      title = "Top 10 Channels Viewed";
      limit = 10;
      orderParam = "view_count";
      break;
    case "Top100_Channels_Viewed":
      title = "Top 100 Channels Viewed";
      limit = 100;
      orderParam = "view_count";
      break;
    case "Top1000_Channels_Viewed":
      title = "Top 1000 Channels Viewed";
      limit = 1000;
      orderParam = "view_count";
      break;

    case "Top10_Channels_Daily":
      title = "Top 10 Channels Daily";
      limit = 10;
      orderParam = "views_per_second";
      break;
    case "Top100_Channels_Daily":
      title = "Top 100 Channels Daily";
      limit = 100;
      orderParam = "views_per_second";
      break;
    case "Top1000_Channels_Daily":
      title = "Top 1000 Channels Daily";
      limit = 1000;
      orderParam = "views_per_second";
      break;
    case "Top10000_Channels_Daily":
      title = "Top 10000 Channels Daily";
      limit = 10000;
      orderParam = "views_per_second";
      break;
    case "Top10_Channels_Videos":
      title = "Top 10 Channels Videos";
      limit = 10;
      orderParam = "video_count";
      break;
    case "Top100_Channels_Videos":
      title = "Top 100 Channels Videos";
      limit = 100;
      orderParam = "video_count";
      break;
    case "Top1000_Channels_Videos":
      title = "Top 1000 Channels Videos";
      limit = 1000;
      orderParam = "video_count";
      break;
    case "Top10000_Channels_Videos":
      title = "Top 10000 Channels Videos";
      limit = 10000;
      orderParam = "video_count";
      break;
    case "Top10_Channels_AverageViews":
      title = "Top 10 Videos Average Views";
      limit = 10;
      orderParam = "average_views";
      break;
    case "Top100_Channels_AverageViews":
      title = "Top 100 Videos Average Views";
      limit = 100;
      orderParam = "average_views";
      break;
    case "Top1000_Channels_AverageViews":
      title = "Top 1000 Videos Average Views";
      limit = 1000;
      orderParam = "average_views";
      break;
    case "Top10000_Channels_AverageViews":
      title = "Top 10000 Videos Average Views";
      limit = 10000;
      orderParam = "average_views";
      break;
    // Додайте інші варіанти за необхідністю
    default:
      title = "Top 10 Channels Viewed"; // Виберіть значення за замовчуванням
      limit = 10;
      orderParam = "view_count";
  }
  console.log(title);
  console.log(limit);
  console.log(orderParam);

  url = `http://localhost:3000/api/all_channels?title=${title}&limit=${limit}&orderBy=${orderParam}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data.playlist);
    setVideos(data.playlist || []);
  } catch (error) {
    console.error("Помилка отримання каналів:", error);
  }
};

export default fetchChannels;
