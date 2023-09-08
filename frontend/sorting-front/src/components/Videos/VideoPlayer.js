import React from "react";

const VideoPlayer = ({ videoId, title }) => (
  <div>
    <h3 className="titleVideos">{title}</h3>
    <iframe
      className="youtube-player"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube Video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export default VideoPlayer;
