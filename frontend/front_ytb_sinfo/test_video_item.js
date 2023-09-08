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
//         case "playlist_content":
//           title = "Top 3 Most Viewed Daily Videos"; // Вкажіть назву плейлиста тут
//           // const author = "some_author"; // Вкажіть автора плейлиста тут
//           // const sort = "title"; // Вкажіть сортування тут
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10`;
//           // url = `http://localhost:3000/api/playlist_content?title=${title}&author=${author}&sort=${sort}&page=${page}&limit=10`;

//           break;
//         case "top5":
//           title = "Top 3 Most Viewed Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10`;
//           break;
//         case "top10":
//           title = "Top 10 Most Viewed Daily Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10`;
//           break;
//         default:
//           url = `http://localhost:3000/api/views_per_second?page=${page}&limit=10`;
//       }

//       try {
//         const response = await axios.get(url);
//         setVideos((prevVideos) => {
//           if (page === 1) {
//             return [...response.data.result];
//           } else {
//             return [...prevVideos, ...response.data.result];
//           }
//         });
//         setLoading(false);
//         setHasMore(response.data.result.length > 0);
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
//   };

//   return (
//     <div className="video-container">
//       <select value={sortType} onChange={handleSortTypeChange}>
//         <option value="views_per_second">Популярність</option>
//         <option value="viewes">Перегляди</option>
//         <option value="for_kids">Для дітей популярні</option>
//         <option value="playlist_content">Топ 3 за переглядами</option>
//         <option value="top5">Топ 5 за переглядами</option>
//         <option value="top10">Топ 10 за переглядами</option>
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
//       {!loading && hasMore && videos.length >= 10 && (
//         <button className="load-more-button" onClick={handleLoadMore}></button>
//       )}
//     </div>
//   );
// };

// export default VideoItem;
