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
import "./ChannelsItem.css";
const ChannelsItemAverageViews = ({ channel, index }) => {
  let statusStyle = {};
  let statusIcon = null;

  console.log(`STATUS: ${channel.new_video_id}`);

  // Визначення статусу
  let status = "unchanged"; // Статус за замовчуванням "unchanged"
  if (channel.old_video_id === null && channel.new_video_id !== null) {
    status = "added";
    statusIcon = <FaPlus />;
  } else if (channel.new_video_id === null && channel.old_order !== null) {
    status = "deleted";
    statusIcon = <FaMinus />;
  } else if (
    channel.old_video_id !== null &&
    channel.new_video_id !== null &&
    channel.old_video_id !== channel.new_video_id
  ) {
    status = "replaced";
    statusIcon = <FaSyncAlt />;
  } else if (channel.old_order !== channel.new_order) {
    status = "reordered";
    statusIcon =
      channel.old_order > channel.new_order ? <FaArrowUp /> : <FaArrowDown />;
  }

  // Обчислити зміну позиції
  let positionChange = null;
  if (status === "reordered") {
    positionChange = channel.old_order - channel.new_order;
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
        {channel.channel_id}
        <br />
        <a
          href={`https://www.youtube.com/channel/${channel.channel_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="channel-button">go to channel</button>
        </a>
      </td>{" "}
      <td>{channel.title}</td>
      <td>{channel.country}</td>
      <td>{channel.created_at}</td>
      <td>
        old: {channel.curr_subscriber_count}
        <br />
        new: {channel.subscriber_count}
        <br />
        diff: {channel.subscriber_count - channel.curr_subscriber_count}
        <br />
      </td>
      <td>
        old: {channel.prev_video_count}
        <br />
        new: {channel.video_count}
        <br />
        diff: {channel.video_count - channel.prev_video_count}
      </td>
      <td>
        {channel.averageViews}
        <br />
      </td>
      <td className="columnImgChannek">
        <a
          href={`https://www.youtube.com/channel/${channel.channel_id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", textDecoration: "none" }} // Щоб видалити будь-яку підкреслення або інші стандартні стилі посилань
        >
          <div className="thumbnail-block">
            <img
              className="thumbnail-cell"
              src={channel.thumbnail_url}
              alt={`${channel.title} Thumbnail`}
            />
          </div>
        </a>
      </td>
    </tr>
  );
};

export default ChannelsItemAverageViews;
