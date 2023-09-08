import axios from "axios";

const fetchVideos = async (sortType, page) => {
  let url;
  let title;
  switch (sortType) {
    case "Top10_Most_Viewed_Daily":
      title = "Top 10 Most Viewed Daily Videos";
      url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10`;
      break;
    case "Top10_Most_Viewed":
      title = "Top 10 Most Viewed Videos";
      url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10`;
      break;
    case "Top100_Most_Viewed_Daily":
      title = "Top 100 Most Viewed Daily Videos";
      url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100`;
      break;
    case "Top100_Most_Viewed":
      title = "Top 100 Most Viewed Videos";
      url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100`;
      break;
    case "Top1000_Most_Viewed_Daily":
      title = "Top 1000 Most Viewed Daily Videos";
      url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=1000`;
      break;
    case "Top1000_Most_Viewed":
      title = "Top 1000 Most Viewed Videos";
      url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=1000`;
      break;
    case "Top10000_Most_Viewed_Daily":
      title = "Top 10000 Most Viewed Daily Videos";
      url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10000`;
      break;
    case "Top10000_Most_Viewed":
      title = "Top 10000 Most Viewed Videos";
      url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10000`;
      break;
    case "Top100000_Most_Viewed_Daily":
      title = "Top 100000 Most Viewed Daily Videos";
      url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100000`;
      break;
    case "Top100000_Most_Viewed":
      title = "Top 100000 Most Viewed Videos";
      url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100000`;
      break;
    default:
      url = `http://localhost:3000/api/viewes?page=${page}&limit=10`;
  }

  try {
    const response = await axios.get(url);
    const fetchedVideos = response.data.result;
    return { playlist: fetchedVideos.playlist, deletedVideos: fetchedVideos.deletedVideos };
  } catch (error) {
    console.error(error);
    return null; // або інший спосіб обробки помилки
  }
};

export default fetchVideos;
