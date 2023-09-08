import React, { useState, useEffect } from "react";
import "./SortButtons.css";
import ButtonMenu from "./ButtonMenu";
import ChannelButtonMenu from "./ChannelButtonMenu/ChannelButtonMenu";

const SortButtons = ({ setSortType, resultCategory, navigateToRow, refs }) => {
  const [activeSort, setActiveSort] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(false);

  const [statusIndex, setStatusIndex] = useState({
    added: 0,
    deleted: 0,
    reordered: 0,
    unchanged: 0,
  });

  const navigateStatus = (status, direction) => {
    let currentIndex = statusIndex[status];
  
    if (direction === "forward") {
      currentIndex++;
    } else {
      currentIndex--;
    }
  
    const maxIndex = resultCategory[status] - 1;
    if (currentIndex < 0) currentIndex = maxIndex;
    if (currentIndex > maxIndex) currentIndex = 0;
  
    setStatusIndex({ ...statusIndex, [status]: currentIndex });
  
    navigateToRow(status, direction);
  };
  
  const handleSortTypeChange = (e) => {
    const value = e.target.value;
    setSortType(value);
    setActiveSort(value);
    setSidebarActive(false);
  };

  useEffect(() => {
    const closeSidebar = (e) => {
      if (
        !document.querySelector(".table-container").contains(e.target) &&
        !document.querySelector(".burger-menu").contains(e.target)
      ) {
        setSidebarActive(false);
      }
    };

    if (sidebarActive) {
      window.addEventListener("click", closeSidebar);
    }

    return () => {
      window.removeEventListener("click", closeSidebar);
    };
  }, [sidebarActive]);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div>
      <div className="burger-menu" onClick={toggleSidebar}>
        ☰
      </div>
      <div className={`table-container ${sidebarActive ? "active" : ""}`}>
        <h1 className="table-title">TOP VIDEOS</h1>
        <ButtonMenu handleSortTypeChange={handleSortTypeChange} activeSort={activeSort} />
        <h1 className="table-title">TOP CHANNELS</h1>

        <ChannelButtonMenu handleSortTypeChange={handleSortTypeChange} activeSort={activeSort}/>
        <div className="statBlock">
          {["added", "deleted", "reordered", "unchanged"].map((status) => (
            <div className="navigation" key={status}>
              <span className={`statusText ${status}`}>{`${status}: ${resultCategory[status]} `}</span>
              <div className="navigation-arrows">
                <div className="arrow arrow-up" onClick={() => navigateStatus(status, "back")}>
                
                </div>
                <div className="arrow arrow-down" onClick={() => navigateStatus(status, "forward")}>
                
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortButtons;
