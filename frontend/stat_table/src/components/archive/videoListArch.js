// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import VideoItem from "./VideoItem";
// import SortButtons from "./SortButtons/SortButtons";
// import "./VideoList.css";

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [sortType, setSortType] = useState("views_per_second");

//   useEffect(() => {
//     const fetchVideos = async () => {
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
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=3000`;
//           break;
//         case "Top10000_Most_Viewed":
//           title = "Top 10000 Most Viewed Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=3000`;
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
//         setVideos((prevVideos) => {
//           return [...prevVideos, ...response.data.result];
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchVideos();
//   }, [page, sortType]);

//   const handleSortTypeChange = (sortType) => {
//     setSortType(sortType);
//     setPage(1);
//     setVideos([]);
//   };

//   return (
//     <div className="container">
//       <SortButtons
//         className="buttonSortTop"
//         setSortType={handleSortTypeChange}
//       />
//       <table className="video-table">
//         <thead>
//           <tr>
//             <th className="table-header">Number</th>
//             <th className="table-header">Status</th>
//             <th className="table-header">Title</th>
//             <th className="table-header">Views</th>
//             <th className="table-header">Time</th>
//             <th className="table-header">Likes</th>
//             <th className="table-header">Link</th>
//           </tr>
//         </thead>
//         <tbody>
//           {videos.map((video, index) => (
//             <VideoItem key={index} video={video} index={index} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VideoList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import VideoItem from "./VideoItem";
// import SortButtons from "./SortButtons/SortButtons";
// import "./VideoList.css";

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [sortType, setSortType] = useState("views_per_second");

//   console.log(videos);

//   useEffect(() => {
//     const fetchVideos = async () => {
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
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10000`;
//           break;
//         case "Top10000_Most_Viewed":
//           title = "Top 10000 Most Viewed Videos";
//           url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10000`;
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
//         console.log(response);
//         setVideos((prevVideos) => {
//           return [...prevVideos, ...response.data.result];
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchVideos();
//   }, [page, sortType]);

//   const handleSortTypeChange = (sortType) => {
//     setSortType(sortType);
//     setPage(1);
//     setVideos([]);
//   };

//   return (
//     <div className="container">
//       <SortButtons
//         className="buttonSortTop"
//         setSortType={handleSortTypeChange}
//       />
//       <table className="video-table">
//         <thead>
//           <tr>
//             <th className="table-header">Number</th>
//             <th className="table-header">Status</th>
//             <th className="table-header">Title</th>
//             <th className="table-header">Views</th>
//             <th className="table-header">Time</th>
//             <th className="table-header">Likes</th>
//             <th className="table-header">Link</th>
//           </tr>
//         </thead>
//         <tbody>
//           {videos.map((video, index) => (
//             <VideoItem key={index} video={video} index={index} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VideoList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import VideoItem from "./VideoItem";
// import SortButtons from "./SortButtons/SortButtons";
// import "./VideoList.css";

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [sortType, setSortType] = useState("views_per_second");

//   console.log(videos);

//   const fetchVideos = async () => {
//     let url;
//     let title;
//     switch (sortType) {
//       case "views_per_second":
//         url = `http://localhost:3000/api/views_per_second?page=${page}&limit=10`;
//         break;
//       case "viewes":
//         url = `http://localhost:3000/api/viewes?page=${page}&limit=10`;
//         break;
//       case "for_kids":
//         url = `http://localhost:3000/api/made_for_kids?page=${page}&limit=10`;
//         break;

//       case "Top10_Most_Viewed_Daily":
//         title = "Top 10 Most Viewed Daily Videos";
//         url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10`;
//         break;
//       case "Top10_Most_Viewed":
//         title = "Top 10 Most Viewed Videos";
//         url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10`;
//         break;

//       case "Top100_Most_Viewed_Daily":
//         title = "Top 100 Most Viewed Daily Videos";
//         url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100`;
//         break;
//       case "Top100_Most_Viewed":
//         title = "Top 100 Most Viewed Videos";
//         url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100`;
//         break;

//       case "Top1000_Most_Viewed_Daily":
//         title = "Top 1000 Most Viewed Daily Videos";
//         url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=1000`;
//         break;
//       case "Top1000_Most_Viewed":
//         title = "Top 1000 Most Viewed Videos";
//         url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=1000`;
//         break;

//       case "Top10000_Most_Viewed_Daily":
//         title = "Top 10000 Most Viewed Daily Videos";
//         url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10000`;
//         break;
//       case "Top10000_Most_Viewed":
//         title = "Top 10000 Most Viewed Videos";
//         url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=10000`;
//         break;
//       case "Top100000_Most_Viewed_Daily":
//         title = "Top 100000 Most Viewed Daily Videos";
//         url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100000`;
//         break;
//       case "Top100000_Most_Viewed":
//         title = "Top 100000 Most Viewed Videos";
//         url = `http://localhost:3000/api/top_playlist?title=${title}&page=${page}&limit=100000`;
//         break;
//       default:
//         url = `http://localhost:3000/api/viewes?page=${page}&limit=10`;
//     }

//     try {
//       const response = await axios.get(url);
//       const fetchedVideos = response.data.result; // зміна тут

//       setVideos(fetchedVideos);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, [page, sortType]);

//   const handleSortTypeChange = (sortType) => {
//     setSortType(sortType);
//     setPage(1);
//   };

//   return (
//     <div className="container">
//       <SortButtons
//         className="buttonSortTop"
//         setSortType={handleSortTypeChange}
//       />
//       <table className="video-table">
//         <thead>
//           <tr>
//             <th className="table-header">Number</th>
//             <th className="table-header">Status</th>
//             <th className="table-header">Title</th>
//             <th className="table-header">Views</th>
//             <th className="table-header">Time</th>
//             <th className="table-header">Likes</th>
//             <th className="table-header">Link</th>
//           </tr>
//         </thead>
//         <tbody>
//           {videos.map((video, index) => (
//             <VideoItem key={index} video={video} index={index} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VideoList;
