import React from "react";
import "./VideoItem.css";
import ScrollButton from "./ScrollButton/ScrollButton";
import {
  FaPlus,
  FaMinus,
  FaSyncAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const VideoItem = ({ video, onClick, index, sortType }) => {
  const {
    id,
    title,
    lengthVideo,
    okLike,
    titleUrl,
    viewes,
    likes_per_second,
    views_per_second,
    old_video_id,
    new_video_id,
    old_order,
    new_order,
  } = video;
  const videoId = new URL(titleUrl).searchParams.get("v");
  const imageUrl = `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`;
  const link = `https://www.youtube.com/watch?v=${videoId}`;

  const likesToDisplay = sortType.includes("Daily")
    ? (likes_per_second * 60 * 60 * 24).toFixed(0)
    : okLike;
  const viewsToDisplay = sortType.includes("Daily")
    ? (views_per_second * 60 * 60 * 24).toFixed(0)
    : viewes;

  let statusStyle = {};
  let statusIcon = null;

  // Визначення статусу
  let status = "unchanged"; // Статус за замовчуванням "unchanged"
  if (old_video_id === null && new_video_id !== null) {
    status = "added";
    statusIcon = <FaPlus />;
  } else if (new_video_id === null && old_order !== null) {
    status = "deleted";
    statusIcon = <FaMinus />;
  } else if (
    old_video_id !== null &&
    new_video_id !== null &&
    old_video_id !== new_video_id
  ) {
    status = "replaced";
    statusIcon = <FaSyncAlt />;
  } else if (old_order !== new_order) {
    status = "reordered";
    statusIcon = old_order > new_order ? <FaArrowUp /> : <FaArrowDown />;
  }

  // Обчислити зміну позиції
  let positionChange = null;
  if (status === "reordered") {
    positionChange = old_order - new_order;
  }

  switch (status) {
    case "unchanged":
      statusStyle = { color: "grey" };
      break;
    case "reordered":
      statusStyle = { color: "orange" };
      break;
    case "added":
      statusStyle = { color: "green" };
      break;
    case "deleted":
      statusStyle = { color: "red" };
      break;
    case "replaced":
      statusStyle = { color: "blue" };
      break;
    default:
      statusStyle = { color: "black" };
  }

  const handleVideoClick = () => {
    onClick(id);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <li className="video-list" onClick={handleVideoClick}>
      <div className="video-link">
        <a href={link} target="_blank" rel="noopener noreferrer">
          Watch YouTube
        </a>
      </div>
      <div className="listInfo">
        <div className="video-content">
          <div className="video-number">{index + 1}</div>
          <div className="video-details">
            <p>{title}</p>
            <div className="statusBlock">
              <div>
                <p style={statusStyle}>{status}</p>
              </div>
              <div style={statusStyle}>
                {statusIcon}
                {positionChange && (
                  <span style={{ color: positionChange > 0 ? "green" : "red" }}>
                    {positionChange > 0
                      ? ` (+${positionChange})`
                      : ` (${positionChange})`}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="video-thumbnail">
            <div className="video-description">
              <div className="info-video">
                <div>Views</div>
                {viewsToDisplay}
              </div>
              <div className="info-video">
                <div>Time</div>
                <div>{formatTime(lengthVideo)}</div>
              </div>
              <div className="info-video">
                <div>Likes</div>
                {likesToDisplay}
              </div>
            </div>
            <img src={imageUrl} alt={title} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default VideoItem;
