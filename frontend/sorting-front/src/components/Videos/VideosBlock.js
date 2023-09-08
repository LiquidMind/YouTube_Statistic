import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import "./VideosBlock.css";

const VideosBlock = ({ videos, onButtonClick }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleFirstButtonClick = () => {
    onButtonClick(videos[0].id, videos[1].id, ">");
  };

  const handleSecondButtonClick = () => {
    onButtonClick(videos[0].id, videos[1].id, "=");
  };

  const handleThirdButtonClick = () => {
    onButtonClick(videos[0].id, videos[1].id, "<");
  };

  return (
    <div
      className={`videos-block ${
        hoveredButton ? `hovered-${hoveredButton}` : ""
      }`}
    >
      <div className="video-container">
        {videos.map((video, index) => (
          <div className={`video video-${index}`} key={index}>
            <VideoPlayer videoId={video.id} title={video.title} />
            {/* <div className="video-description">{video.description}</div> */}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button
          className="animated-button button-1"
          onClick={handleFirstButtonClick}
          onMouseEnter={() => setHoveredButton(1)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Відео 1
        </button>
        <button
          className="animated-button button-2"
          onClick={handleSecondButtonClick}
          onMouseEnter={() => setHoveredButton(2)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Обидва відео похожі
        </button>
        <button
          className="animated-button button-3"
          onClick={handleThirdButtonClick}
          onMouseEnter={() => setHoveredButton(3)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Відео 2
        </button>
      </div>
    </div>
  );
};

export default VideosBlock;
