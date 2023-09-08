import React from 'react'

const ButtonMenu = ({handleSortTypeChange,activeSort}) => {
  return (
    <div className="button-list">
    <button
      className={`sort-button ${
        activeSort === "Top10_Most_Viewed_Daily" ? "active" : ""
      }`}
      value="Top10_Most_Viewed_Daily"
      onClick={handleSortTypeChange}
    >
      Top 10 Most Viewed Daily Videos
    </button>
    <button
      className={`sort-button ${
        activeSort === "Top10_Most_Viewed" ? "active" : ""
      }`}
      value="Top10_Most_Viewed"
      onClick={handleSortTypeChange}
    >
      Top 10 Most Viewed Videos
    </button>
    <button
      className={`sort-button ${
        activeSort === "Top100_Most_Viewed_Daily" ? "active" : ""
      }`}
      value="Top100_Most_Viewed_Daily"
      onClick={handleSortTypeChange}
    >
      Top 100 Most Viewed Daily Videos
    </button>
    <button
      className={`sort-button ${
        activeSort === "Top100_Most_Viewed" ? "active" : ""
      }`}
      value="Top100_Most_Viewed"
      onClick={handleSortTypeChange}
    >
      Top 100 Most Viewed Videos
    </button>
    <button
      className={`sort-button ${
        activeSort === "Top1000_Most_Viewed_Daily" ? "active" : ""
      }`}
      value="Top1000_Most_Viewed_Daily"
      onClick={handleSortTypeChange}
    >
      Top 1000 Most Viewed Daily Videos
    </button>
    <button
      className={`sort-button ${
        activeSort === "Top1000_Most_Viewed" ? "active" : ""
      }`}
      value="Top1000_Most_Viewed"
      onClick={handleSortTypeChange}
    >
      Top 1000 Most Viewed Videos
    </button>
    <button
      className={`sort-button ${
        activeSort === "Top10000_Most_Viewed_Daily" ? "active" : ""
      }`}
      value="Top10000_Most_Viewed_Daily"
      onClick={handleSortTypeChange}
    >
      Top 10000 Most Viewed Daily Videos
    </button>
    <button
      className={`sort-button ${
        activeSort === "Top10000_Most_Viewed" ? "active" : ""
      }`}
      value="Top10000_Most_Viewed"
      onClick={handleSortTypeChange}
    >
      Top 10000 Most Viewed Videos
    </button>
    <button
      className={`sort-button ${
        activeSort === "Top100000_Most_Viewed_Daily" ? "active" : ""
      }`}
      value="Top100000_Most_Viewed_Daily"
      onClick={handleSortTypeChange}
    >
      Top 100000 Most Viewed Daily Videos
    </button>
    <button
      className={`sort-button ${
        activeSort === "Top100000_Most_Viewed" ? "active" : ""
      }`}
      value="Top100000_Most_Viewed"
      onClick={handleSortTypeChange}
    >
      Top 100000 Most Viewed Videos
    </button>
  </div>
  )
}

export default ButtonMenu
