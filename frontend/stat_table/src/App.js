import React, { useState } from "react";
import VideoList from "./components/VideoList/VideoList.js";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import "./App.css";
import ColorScroller from "./components/ColorScroller/ColorScroller.js";
import RegistrationForm from "./components/auth/RegistrationForm/RegistrationForm.js";

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
];

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="app">
      {/* <div>
      <ColorScroller colors={colors} />
    </div> */}
      <div className="app-container">
        <VideoList onVideoClick={handleVideoClick} />
        {selectedVideo && <div>Відео ID: {selectedVideo}</div>}
      </div>
      <ScrollToTopButton />
      {/* <RegistrationForm /> */}
    </div>
  );
};

export default App;
