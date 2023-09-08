import React, { useEffect, useState, useRef } from "react";
import VideoItem from "../VideoItem/VideoItem";
import SortButtons from "../SortButtons/SortButtons";
import "./VideoList.css";
import DeletedVideoItem from "../DeletedVideoItem/DeletedVideoItem";
import HeaderTable from "./HeaderTable";
import ChannelItem from "../ChannelItem/ChannelItem";
import ChannelsHeaderTable from "./ChannelsHeaderTable";
import ChannelItemDaily from "../ChannelItem/ChanneItemDaily";
import ChannelItemVideos from "../ChannelItem/ChannelItemVideos";
import ChannelsItemAverageViews from "../ChannelItem/ChannelsItemAverageViews";
import MovedVideoItem from "../MovedVideoItem/movedVideo";
import ChannelsHeaderTableDaily from "./ChannelsHeaderTableDaily";
import ChannelsAverageHeader from "./ChannelsAverageHeader";
import getVideoStatus from "./getVideoStatus";
import fetchVideos from "./fetchData/fetchVideo";
import fetchChannels from "./fetchData/fetchChannels";
import "../VideoItem/VideoItem.css";
import { FaPlayCircle } from "react-icons/fa";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("views_per_second");
  const [deletedVideos, setDeletedVideos] = useState([]);
  const [deletedVideoRefs, setDeletedVideoRefs] = useState([]);

  console.log(`SORT_TYPE:  ${videos}`);

  useEffect(() => {
    setDeletedVideoRefs(
      Array(deletedVideos.length)
        .fill()
        .map(() => React.createRef())
    );
  }, [deletedVideos.length]);

  const [selectedRow, setSelectedRow] = useState({ status: null, index: null });
  const [videoRefs, setVideoRefs] = useState([]);
  useEffect(() => {
    setVideoRefs(
      Array(videos.length)
        .fill()
        .map(() => React.createRef())
    );
  }, [videos.length]);

  const navigateToRow = (status, direction) => {
    const statusArray = status === "deleted" ? deletedVideos : videos;
    const statusIndices = statusArray.reduce((acc, video, index) => {
      let videoStatus =
        status === "deleted" ? "deleted" : getVideoStatus(video);
      if (videoStatus === status) acc.push(index);
      return acc;
    }, []);

    let currentIndex = selectedRow.index
      ? statusIndices.indexOf(selectedRow.index)
      : 0;

    if (direction === "forward") {
      currentIndex = (currentIndex + 1) % statusIndices.length;
    } else {
      currentIndex =
        (currentIndex - 1 + statusIndices.length) % statusIndices.length;
    }

    const newRow = {
      status,
      index: statusIndices[currentIndex],
    };

    if (status === "deleted") {
      videoRefs[deletedVideos[newRow.index].old_order].current?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      videoRefs[newRow.index].current?.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedRow(newRow);
  };

  getVideoStatus(videos);

  useEffect(() => {
    setVideoRefs((refs) => Array(videos.length).fill(null));
  }, [videos]);

  useEffect(() => {
    const fetchData = async () => {
      if (sortType.includes("Channels")) {
        fetchChannels(sortType, setVideos);
      } else {
        fetchVideos(sortType, page, setDeletedVideos, setVideos).then(
          ({ playlist, deletedVideos }) => {
            if (playlist) {
              setVideos(playlist);
            }
            if (deletedVideos) {
              setDeletedVideos(deletedVideos);
            }
          }
        );
      }
    };

    fetchData();
  }, [page, sortType]);

  const handleSortTypeChange = (sortType) => {
    setSortType(sortType);
    setPage(1);
  };

  console.log(deletedVideos);

  const statusCount = videos.reduce(
    (acc, video) => {
      let status = "unchanged"; // Статус за замовчуванням "unchanged"
      if (video.old_video_id === null && video.new_video_id !== null) {
        status = "added";
      } else if (video.new_video_id === null && video.old_order !== null) {
        status = "deleted";
      } else if (
        video.old_video_id !== null &&
        video.new_video_id !== null &&
        video.old_video_id !== video.new_video_id
      ) {
        status = "reordered";
      } else if (video.old_order !== video.new_order) {
        status = "reordered";
      }
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { added: 0, reordered: 0, unchanged: 0, deleted: 0 }
  );

  console.log("added:", statusCount.added);
  console.log("reordered:", statusCount.reordered);
  console.log("unchanged:", statusCount.unchanged);
  console.log("deleted:", deletedVideos.length);

  const resultCategory = {
    added: statusCount.added,
    reordered: statusCount.reordered,
    unchanged: statusCount.unchanged,
    deleted: deletedVideos.length,
  };

  console.log("Sort type changed to:", sortType);

  const getMovedVideos = () => {
    return videos
      .filter((video) => video.old_order !== video.new_order)
      .map((video) => ({
        newOrder: video.new_order,
        oldOrder: video.old_order,
        title: video.title,
        id: video.id,
      }));
  };
  // console.log(videos);

  const movedVideos = getMovedVideos();
  // І цей після отримання відповіді від сервера
  return (
    <div className="container">
      <SortButtons
        className="buttonSortTop"
        setSortType={handleSortTypeChange}
        resultCategory={resultCategory}
        navigateToRow={navigateToRow}
      />
      <table className="video-table">
        <thead>
          {sortType.includes("Channels_Viewed") ? (
            <ChannelsHeaderTable />
          ) : sortType.includes("Channels_Daily") ? (
            <ChannelsHeaderTableDaily />
          ) : sortType.includes("Channels_Videos") ? (
            <ChannelsHeaderTable />
          ) : sortType.includes("Channels_AverageViews") ? (
            <ChannelsAverageHeader />
          ) : (
            <HeaderTable />
          )}
        </thead>
        {videos.length > 0 ? (
          videos.map((video, index) => {
            const videoStatus = getVideoStatus(video);
            const ref = (videoRefs[index] = React.createRef());

            // Find if there's a moved video that was originally at this index
            const movedVideo = movedVideos.find((mv) => mv.oldOrder === index);

            if (sortType.includes("Channels_Viewed")) {
              return (
                <tbody key={index}>
                  <ChannelItem video={video} index={index} />
                </tbody>
              );
            } else if (sortType.includes("Channels_Daily")) {
              return (
                <tbody key={index}>
                  <ChannelItemDaily channel={video} index={index} />
                </tbody>
              );
            } else if (sortType.includes("Channels_Videos")) {
              return (
                <tbody key={index}>
                  <ChannelItemVideos channel={video} index={index} />
                </tbody>
              );
            } else if (sortType.includes("Channels_AverageViews")) {
              return (
                <tbody key={index}>
                  <ChannelsItemAverageViews channel={video} index={index} />
                </tbody>
              );
            } else {
              return (
                <React.Fragment key={index}>
                  {movedVideo && (
                    <tbody key={`moved-info-${index}`}>
                      <MovedVideoItem video={movedVideo} />
                    </tbody>
                  )}
                  <tbody ref={ref}>
                    <tr
                      className={
                        videoStatus === selectedRow.status &&
                        index === selectedRow.index
                          ? "selected-row"
                          : ""
                      }
                    >
                      <td>{index + 1}</td>
                      <VideoItem
                        video={video}
                        index={index}
                        sortType={sortType}
                      />
                    </tr>
                  </tbody>
                  {deletedVideos.find(
                    (deletedVideo) => deletedVideo.old_order + 1 === index + 1
                  ) && (
                    <tbody ref={ref}>
                      <tr className="deletedStyle">
                        <DeletedVideoItem
                          deletedVideo={deletedVideos.find(
                            (deletedVideo) =>
                              deletedVideo.old_order + 1 === index + 1
                          )}
                        />
                      </tr>
                    </tbody>
                  )}
                </React.Fragment>
              );
            }
          })
        ) : (
          <tbody>
            <tr>
              <td colSpan="10" className="placeholder-block">
                <div className="iconFone">
                  <FaPlayCircle />
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default VideoList;
