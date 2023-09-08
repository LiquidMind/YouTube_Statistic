

import React, { useState,useEffect,useRef } from "react";
import "./SortButtons.css";
import ButtonMenu from "./ButtonMenu";

const SortButtons = ({ setSortType, resultCategory,onNavigateToRow,refs }) => {
  const [activeSort, setActiveSort] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(false);

  // Індекс для кожного статусу
  const [statusIndex, setStatusIndex] = useState({
    added: 0,
    deleted: 0,
    reordered: 0,
    unchanged: 0,
  });



  const navigateStatus = (status, direction) => {
    // Отримуємо поточний індекс для даного статусу
    let currentIndex = statusIndex[status];

    // Збільшуємо або зменшуємо індекс згідно напрямку
    if (direction === "forward") {
      currentIndex++;
    } else {
      currentIndex--;
    }
console.log(currentIndex)
console.log(status)
    // Циклічна навігація
    const maxIndex = resultCategory[status] - 1;
    if (currentIndex < 0) currentIndex = maxIndex;
    if (currentIndex > maxIndex) currentIndex = 0;

    // Встановлюємо новий індекс для статусу
    setStatusIndex({ ...statusIndex, [status]: currentIndex });
    // Викликаємо функцію прокрутки до відповідного рядка
    onNavigateToRow(status, currentIndex);  };


  const handleSortTypeChange = (e) => {
    const value = e.target.value;
    setSortType(value);
    setActiveSort(value);
    setSidebarActive(false);
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
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

  return (
    <div>
      <div className="burger-menu" onClick={toggleSidebar}>
        ☰
      </div>
      <div className={`table-container ${sidebarActive ? "active" : ""}`}>
        <h1 className="table-title">TOP VIDEOS</h1>
        <ButtonMenu handleSortTypeChange={handleSortTypeChange} activeSort={activeSort} />
        <div className="statBlock">
          {["added", "deleted", "reordered", "unchanged"].map((status) => (
            <div className="navigation" key={status}>
              <span>{`${status}: ${resultCategory[status]} (Current: ${statusIndex[status] + 1})`}</span>
              <button onClick={() => navigateStatus(status, "back")}>НАЗАД</button>
              <button onClick={() => navigateStatus(status, "forward")}>ВПЕРЕД</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortButtons;





