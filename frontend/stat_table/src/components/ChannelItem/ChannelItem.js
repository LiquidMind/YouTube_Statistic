import React from "react";
import "./ChannelsItem.css";
import {
  FaPlus,
  FaMinus,
  FaSyncAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import "../VideoItem/VideoItem.css";

const ChannelItem = ({ video, index, sortType }) => {
  let statusStyle = {};
  let statusIcon = null;

  console.log(`STATUS: ${video.new_video_id}`);

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
    <tr>
      <td>{index + 1}</td>
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
      <td>
        {video.channel_id}
        <br />
        <a
          href={`https://www.youtube.com/channel/${video.channel_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="channel-button">go to channel</button>
        </a>
      </td>{" "}
      <td>{video.title}</td>
      <td>{video.country}</td>
      <td>{video.created_at}</td>
      <td>
        old: {video.curr_subscriber_count}
        <br />
        new: {video.subscriber_count}
        <br />
        diff: {video.subscriber_count - video.curr_subscriber_count}
        <br />
      </td>
      <td>
        old: {video.prev_video_count}
        <br />
        new: {video.video_count}
        <br />
        diff: {video.video_count - video.prev_video_count}
      </td>
      <td>
        old: {video.prev_view_count}
        <br />
        new: {video.view_count}
        <br />
        diff: {video.view_count - video.prev_video_count}
      </td>
      <td className="columnImgChannek">
        <a
          href={`https://www.youtube.com/channel/${video.channel_id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", textDecoration: "none" }} // Щоб видалити будь-яку підкреслення або інші стандартні стилі посилань
        >
          <div className="thumbnail-block">
            <img
              className="thumbnail-cell"
              src={video.thumbnail_url}
              alt={`${video.title} Thumbnail`}
            />
          </div>
        </a>
      </td>
    </tr>
  );
};

export default ChannelItem;
