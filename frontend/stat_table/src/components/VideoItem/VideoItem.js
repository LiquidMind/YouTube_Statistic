import React, { useState } from "react";
import VideoModal from "../VideoModal/VideoModal";
import Modal from "react-modal";
import {
  FaPlus,
  FaMinus,
  FaSyncAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import "./VideoItem.css";

Modal.setAppElement("#root");

const VideoItem = ({ video, index, sortType }) => {
  console.log(`STATUS: ${video.old_video_id}`);
  console.log(`STATUS: ${video.new_video_id}`);

  console.log(video);
  const seconds = video.lengthVideo;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hours.toString().padStart(2, "0")}:`;
  }
  formattedTime += `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;

  let statusStyle = {};
  let statusIcon = null;

  // Визначення статусу
  let status = "unchanged"; // Статус за замовчуванням "unchanged"
  if (video.old_video_id === null && video.new_video_id !== null) {
    status = "added";
    statusIcon = <FaPlus />;
  } else if (video.new_video_id === null && video.old_order !== null) {
    status = "deleted";
    statusIcon = <FaMinus />;
  } else if (
    video.old_video_id !== null &&
    video.new_video_id !== null &&
    video.old_video_id !== video.new_video_id
  ) {
    status = "replaced";
    statusIcon = <FaSyncAlt />;
  } else if (video.old_order !== video.new_order) {
    status = "reordered";
    statusIcon =
      video.old_order > video.new_order ? <FaArrowUp /> : <FaArrowDown />;
  }

  // Обчислити зміну позиції
  let positionChange = null;
  if (status === "reordered") {
    positionChange = video.old_order - video.new_order;
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

  const difView = video.viewes - video.prev_views;
  const diffLike = video.okLike - video.prev_likes;

  return (
    <>
      <td className={`statusStyle centered`} style={statusStyle}>
        {statusIcon} {status}
        {status === "reordered" && (
          <span style={{ color: positionChange > 0 ? "green" : "red" }}>
            {positionChange > 0
              ? ` (+${positionChange})`
              : ` (${positionChange})`}
          </span>
        )}
      </td>
      <td>{video.title}</td>
      <td>
        old: {video.prev_views}
        <br /> new:{video.viewes}
        <br />
        diff: {difView}
      </td>
      <td>{(video.views_per_second * 60 * 60 * 24).toFixed(0)}</td>
      <td>
        new: {video.okLike}
        <br />
        old: {video.prev_likes}
        <br /> diff: {diffLike}
      </td>
      <td>{(video.likes_per_second * 60 * 60 * 24).toFixed(0)}</td>
      <td>
        <a
          href={`https://www.youtube.com/watch?v=${video.video_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {video.video_id}
        </a>
      </td>
      <td>{formattedTime}</td>
      <td>
        <td className="playerBlock">
          <VideoModal
            videoUrl={`https://www.youtube.com/watch?v=${video.video_id}`}
          />
        </td>
      </td>
    </>
  );
};

export default VideoItem;
