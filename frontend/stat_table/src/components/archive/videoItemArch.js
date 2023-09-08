// import React, { useState } from "react";
// import Modal from "react-modal";
// import "./VideoItem.css";

// import {
//   FaPlus,
//   FaMinus,
//   FaSyncAlt,
//   FaArrowUp,
//   FaArrowDown,
//   FaPlayCircle,
//   FaTimesCircle,
// } from "react-icons/fa";

// Modal.setAppElement("#root");

// const VideoItem = ({ video, index, sortType }) => {
//   const seconds = video.lengthVideo;
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = seconds % 60;

//   let formattedTime = "";
//   if (hours > 0) {
//     formattedTime += `${hours.toString().padStart(2, "0")}:`;
//   }
//   formattedTime += `${minutes.toString().padStart(2, "0")}:${remainingSeconds
//     .toString()
//     .padStart(2, "0")}`;

//   let statusStyle = {};
//   let statusIcon = null;

//   // Визначення статусу
//   let status = "unchanged"; // Статус за замовчуванням "unchanged"
//   if (video.old_video_id === null && video.new_video_id !== null) {
//     status = "added";
//     statusIcon = <FaPlus />;
//   } else if (video.old_video_id !== null && video.new_video_id === null) {
//     status = "deleted";
//     statusIcon = <FaMinus />;
//   } else if (
//     video.old_video_id !== null &&
//     video.new_video_id !== null &&
//     video.old_video_id !== video.new_video_id
//   ) {
//     status = "replaced";
//     statusIcon = <FaSyncAlt />;
//   } else if (video.old_order !== video.new_order) {
//     status = "reordered";
//     statusIcon =
//       video.old_order > video.new_order ? <FaArrowUp /> : <FaArrowDown />;
//   }

//   // Обчислити зміну позиції
//   let positionChange = null;
//   if (status === "reordered") {
//     positionChange = video.old_order - video.new_order;
//   }

//   switch (status) {
//     case "unchanged":
//       statusStyle = { color: "grey" };
//       break;
//     case "reordered":
//       statusStyle = { color: "orange" };
//       break;
//     case "added":
//       statusStyle = { color: "green" };
//       break;
//     case "deleted":
//       statusStyle = { color: "red" };
//       break;
//     case "replaced":
//       statusStyle = { color: "blue" };
//       break;
//     default:
//       statusStyle = { color: "black" };
//   }

//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const openModal = () => setModalIsOpen(true);
//   const closeModal = () => setModalIsOpen(false);

//   return (
//     <tr>
//       <td>{index + 1}</td>
//       <td style={statusStyle}>
//         {statusIcon} {status}
//         {/* Відображення зміни позиції */}
//         {status === "reordered" && (
//           <span style={{ color: positionChange > 0 ? "green" : "red" }}>
//             {positionChange > 0
//               ? ` (+${positionChange})`
//               : ` (${positionChange})`}
//           </span>
//         )}
//       </td>
//       <td>{video.title}</td>
//       <td>
//         {sortType.includes("Daily") ? video.views_per_second : video.viewes}
//       </td>
//       <td>
//         {sortType.includes("Daily") ? video.likes_per_second : video.okLike}
//       </td>
//       <td>{formattedTime}</td>
//       <td>{video.video_id}</td>

//       <td>
//         <button className="openPlayerBtn" onClick={openModal}>
//           <FaPlayCircle />
//         </button>
//       </td>
//       <Modal
//         className="Modal"
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={{
//           content: {
//             top: "50%",
//             left: "50%",
//             right: "auto",
//             bottom: "auto",
//             marginRight: "-50%",
//             transform: "translate(-50%, -50%)",
//           },
//         }}
//       >
//         <button className="closePlayerBtn" onClick={closeModal}>
//           <FaTimesCircle />
//         </button>
//         <iframe
//           title="YouTube Video Player"
//           width="560"
//           height="315"
//           src={video.titleUrl.replace("watch?v=", "embed/")}
//           frameborder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowfullscreen
//         ></iframe>
//       </Modal>
//     </tr>
//   );
// };

// export default VideoItem;

