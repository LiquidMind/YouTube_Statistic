import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoItem from "./VideoItem";
import "./VideoList.css";

const VideoList = ({ onVideoClick }) => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortType, setSortType] = useState("views_per_second");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      let url;
      let title;
      switch (sortType) {
        case "views_per_second":
          url = `http://localhost:3000/api/views_per_second?page=${page}&limit=10`;
          break;
        case "viewes":
          url = `http://localhost:3000/api/viewes?page=${page}&limit=10`;
          break;
        case "for_kids":
          url = `http://localhost:3000/api/made_for_kids?page=${page}&limit=10`;
          break;

        // TOP 10

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
          url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=3000`;
          break;
        case "Top10000_Most_Viewed":
          title = "Top 10000 Most Viewed Videos";
          url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=3000`;
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

        // check if array is empty
        if (response.data.result.length === 0) {
          setHasMore(false);
        } else {
          setVideos((prevVideos) => {
            if (page === 1) {
              return [...response.data.result];
            } else {
              return [...prevVideos, ...response.data.result];
            }
          });
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchVideos();
    }
  }, [page, hasMore, sortType]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleVideoClick = (videoId) => {
    onVideoClick(videoId);
  };
  console.log(videos);
  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="video-container">
      <select className="menu" value={sortType} onChange={handleSortTypeChange}>
        <option value="views_per_second">Популярність</option>
        <option value="viewes">Перегляди</option>
        <option value="for_kids">Для дітей популярні</option>

        <option value="Top10_Most_Viewed_Daily">
          Top 10 Most Viewed Daily Videos
        </option>
        <option value="Top10_Most_Viewed">Top 10 Most Viewed Videos</option>

        <option value="Top100_Most_Viewed_Daily">
          Top 100 Most Viewed Daily Videos
        </option>
        <option value="Top100_Most_Viewed">Top 100 Most Viewed Videos</option>

        <option value="Top1000_Most_Viewed_Daily">
          Top 1000 Most Viewed Daily Videos
        </option>
        <option value="Top1000_Most_Viewed">Top 1000 Most Viewed Videos</option>

        <option value="Top10000_Most_Viewed_Daily">
          Top 10000 Most Viewed Daily Videos
        </option>
        <option value="Top10000_Most_Viewed">
          Top 10000 Most Viewed Videos
        </option>
        <option value="Top100000_Most_Viewed_Daily">
          Top 100000 Most Viewed Daily Videos
        </option>
        <option value="Top100000_Most_Viewed">
          Top 100000 Most Viewed Videos
        </option>
      </select>
      <ul>
        {videos.map((video, index) => (
          <VideoItem
            key={index}
            video={video}
            onClick={() => handleVideoClick(video.id)}
            index={index}
            sortType={sortType} // передача sortType в компонент VideoList
          />
        ))}
      </ul>
    </div>
  );
};

export default VideoList;

///////////////////////////
////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import VideoList from "./VideoList";
// import "./VideoItem.css";

// const VideoItem = ({ onVideoClick }) => {
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [sortType, setSortType] = useState("views_per_second");

//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       let url;
//       let title;
//       switch (sortType) {
//         case "views_per_second":
//           url = `http://localhost:3000/api/views_per_second?page=${page}&limit=10`;
//           break;
//         case "viewes":
//           url = `http://localhost:3000/api/viewes?page=${page}&limit=10`;
//           break;
//         case "for_kids":
//           url = `http://localhost:3000/api/made_for_kids?page=${page}&limit=10`;
//           break;

//         // TOP 10

//         case "Top10_Most_Viewed_Daily":
//           title = "Top 10 Most Viewed Daily Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10`;
//           break;
//         case "Top10_Most_Viewed":
//           title = "Top 10 Most Viewed Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10`;
//           break;

//         case "Top100_Most_Viewed_Daily":
//           title = "Top 100 Most Viewed Daily Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100`;
//           break;
//         case "Top100_Most_Viewed":
//           title = "Top 100 Most Viewed Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100`;
//           break;

//         case "Top1000_Most_Viewed_Daily":
//           title = "Top 1000 Most Viewed Daily Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=1000`;
//           break;
//         case "Top1000_Most_Viewed":
//           title = "Top 1000 Most Viewed Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=1000`;
//           break;

//         case "Top10000_Most_Viewed_Daily":
//           title = "Top 10000 Most Viewed Daily Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=5000`;
//           break;
//         case "Top10000_Most_Viewed":
//           title = "Top 10000 Most Viewed Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=5000`;
//           break;
//         case "Top100000_Most_Viewed_Daily":
//           title = "Top 100000 Most Viewed Daily Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100000`;
//           break;
//         case "Top100000_Most_Viewed":
//           title = "Top 100000 Most Viewed Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100000`;
//           break;

//         default:
//           url = `http://localhost:3000/api/viewes?page=${page}&limit=10`;
//       }

//       try {
//         const response = await axios.get(url);

//         // check if array is empty
//         if (response.data.result.length === 0) {
//           setHasMore(false);
//         } else {
//           setVideos((prevVideos) => {
//             if (page === 1) {
//               return [...response.data.result];
//             } else {
//               return [...prevVideos, ...response.data.result];
//             }
//           });
//           // setHasMore(response.data.result.length >= 10);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     if (hasMore) {
//       fetchVideos();
//     }
//   }, [page, hasMore, sortType]);

//   const handleLoadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const handleVideoClick = (videoId) => {
//     onVideoClick(videoId);
//   };

//   const handleSortTypeChange = (e) => {
//     setSortType(e.target.value);
//     setPage(1);
//     setHasMore(true);
//   };

//   return (
//     <div className="video-container">
//       <select className="menu" value={sortType} onChange={handleSortTypeChange}>
//         <option value="views_per_second">Популярність</option>
//         <option value="viewes">Перегляди</option>
//         <option value="for_kids">Для дітей популярні</option>

//         <option value="Top10_Most_Viewed_Daily">
//           Top 10 Most Viewed Daily Videos
//         </option>
//         <option value="Top10_Most_Viewed">Top 10 Most Viewed Videos</option>

//         <option value="Top100_Most_Viewed_Daily">
//           Top 100 Most Viewed Daily Videos
//         </option>
//         <option value="Top100_Most_Viewed">Top 100 Most Viewed Videos</option>

//         <option value="Top1000_Most_Viewed_Daily">
//           Top 1000 Most Viewed Daily Videos
//         </option>
//         <option value="Top1000_Most_Viewed">Top 1000 Most Viewed Videos</option>

//         <option value="Top10000_Most_Viewed_Daily">
//           Top 10000 Most Viewed Daily Videos
//         </option>
//         <option value="Top10000_Most_Viewed">
//           Top 10000 Most Viewed Videos
//         </option>
//         <option value="Top100000_Most_Viewed_Daily">
//           Top 100000 Most Viewed Daily Videos
//         </option>
//         <option value="Top100000_Most_Viewed">
//           Top 100000 Most Viewed Videos
//         </option>
//       </select>
//       <ul>
//         {videos.map((video, index) => (
//           <VideoList
//             key={index}
//             video={video}
//             onClick={() => handleVideoClick(video.id)}
//             index={index}
//           />
//         ))}
//       </ul>
//       {/* {!loading && hasMore && videos.length >= 10 && (
//         <button className="load-more-button" onClick={handleLoadMore}></button>
//       )} */}
//     </div>
//   );
// };

// export default VideoItem;

// ///////////////////////////
