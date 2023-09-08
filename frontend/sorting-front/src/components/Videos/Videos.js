import React, { useEffect, useState } from "react";
import axios from "axios";
import "./videos.css";
import VideosBlock from "./VideosBlock";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingType, setSortingType] = useState(1); // State for sorting type
  const [activeButton, setActiveButton] = useState(1); // State for active button

  // Mapping of sorting types to questions
  const sortingQuestions = {
    age: "Яке відео для більш дорослих дітей або дорослих?",
    usefulness: "Яке відео більш корисне?",
    3: "???????",
    4: "???????",
    5: "???????",
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/all/choice?page=${currentPage}`
      );
      const { result } = response.data;
      setVideos(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = async (videoId1, videoId2, comparison) => {
    try {
      await axios.post("http://localhost:3000/api/sorting", {
        videoId1,
        videoId2,
        sortingType,
      });

      await axios.patch(
        `http://localhost:3000/api/sorting/${videoId1}/${videoId2}`,
        { comparison }
      );
      console.log("Video IDs saved and comparison updated successfully");
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error("Failed to update comparison", error);
    }
  };

  const handleSortingTypeClick = (type) => {
    setSortingType(type);
    setActiveButton(type); // Update the active button state when a button is clicked
  };

  return (
    <div className="container">
      <div className="title">
        <h2>{sortingQuestions[sortingType]}</h2>
      </div>
      <div className="sorting-buttons">
        {["age", "usefulness", 3, 4, 5].map((type) => (
          <button
            className={`button ${activeButton === type ? "button-active" : ""}`} // Add 'button-active' class to the active button
            onClick={() => handleSortingTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <VideosBlock videos={videos} onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Videos;
