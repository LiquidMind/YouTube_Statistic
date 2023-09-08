import "./App.css";
import VideoList from "./components/VideoList";
import YouTubePage from "./components/YoutubePage";
import { useState } from "react";
// import DropdownMenu from "./components/DropdownMenu/DropdownMenu";

function App() {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const handleVideoClick = (videoId) => {
    setSelectedVideoId(videoId);
  };

  return (
    <div className="app">
      <div className="videos-container">
        {/* <DropdownMenu /> */}
        <VideoList onVideoClick={handleVideoClick} />
      </div>
      <YouTubePage videoId={selectedVideoId} />
    </div>
  );
}

export default App;
