import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMinus } from "react-icons/fa";
import VideoModal from "../VideoModal/VideoModal";
import "./DeletedVideoItem.css";

const DeletedVideoItem = ({ deletedVideo }) => {
  const [videoData, setVideoData] = useState({});
  const {
    id,
    title,
    lengthVideo,
    okLike,
    likes_per_second,
    titleUrl,
    viewes,
    views_per_second,
  } = videoData;

  const seconds = lengthVideo;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeLength = "";
  if (hours > 0) {
    timeLength += `${hours.toString().padStart(2, "0")}:`;
  }
  timeLength += `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    const fetchData = async () => {
      console.log(deletedVideo.old_video_id);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/videos_all?id=${deletedVideo.old_video_id}`
        );
        console.log();
        setVideoData(response.data[0]);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, [deletedVideo.old_video_id]);

  // const updatedDate = new Date(deletedVideo.updated_at);
  // const formattedTime = `${updatedDate.toLocaleDateString()} ${updatedDate.toLocaleTimeString()}`;

  // Використовую рандомні значення для випадку, якщо деякі дані відсутні
  const randomValue = () => Math.floor(Math.random() * 10000);

  return (
    <>
      <td className="deleted">
        <FaMinus /> deleted
      </td>
      <td>{title}</td>
      <td>{viewes}</td>
      <td>{(views_per_second * 60 * 60 * 24).toFixed(0)}</td>
      <td>{okLike}</td>
      <td>{(likes_per_second * 60 * 60 * 24).toFixed(0)}</td>
      <td>------</td>
      <td>
        <a
          href={`https://www.youtube.com/watch?v=${deletedVideo.old_video_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {deletedVideo.old_video_id || randomValue()}
        </a>
      </td>
      <td>{timeLength}</td>
      <td>
        <VideoModal
          videoUrl={`https://www.youtube.com/watch?v=${deletedVideo.old_video_id}`}
        />
      </td>
    </>
  );
};

export default DeletedVideoItem;
