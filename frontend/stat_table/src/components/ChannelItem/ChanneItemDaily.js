// const daysDifference = (date1, date2) => {
//   const msInADay = 1000 * 60 * 60 * 24;
//   const diffInMs = Date.parse(date2) - Date.parse(date1);
//   return diffInMs / msInADay;
// };
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

const ChannelItemDaily = ({ channel, index, sortType }) => {
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
      <td>
        old: {channel.prev_views}
        <br />
        new: {channel.curr_views}
        <br />
        diff: {channel.curr_views - channel.prev_views}
      </td>
      <td>
        old: {channel.subscriber_count}
        <br />
        new: {channel.curr_subscriber_count}
        <br />
        diff: {channel.curr_subscriber_count - channel.subscriber_count}
      </td>
      <td>
        old: {channel.prev_video_count}
        <br />
        new: {channel.curr_video_count}
        <br />
        diff: {channel.curr_video_count - channel.prev_video_count}
      </td>
      <td>{channel.views_per_day}</td>
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

export default ChannelItemDaily;
