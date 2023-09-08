const ChannelButtonMenu = ({ handleSortTypeChange, activeSort }) => {
    return (
      <div className="button-list">
        <button
          className={`sort-button ${
            activeSort === "Top10_Channels_Viewed" ? "active" : ""
          }`}
          value="Top10_Channels_Viewed"
          onClick={handleSortTypeChange}
        >
          Top 10 Channels Viewed
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top100_Channels_Viewed" ? "active" : ""
          }`}
          value="Top100_Channels_Viewed"
          onClick={handleSortTypeChange}
        >
          Top 100 Channels Viewed
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top1000_Channels_Viewed" ? "active" : ""
          }`}
          value="Top1000_Channels_Viewed"
          onClick={handleSortTypeChange}
        >
          Top 1000 Channels Viewed
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top10000_Channels_Viewed" ? "active" : ""
          }`}
          value="Top10000_Channels_Viewed"
          onClick={handleSortTypeChange}
        >
          Top 10000 Channels Viewed
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top10_Channels_Daily" ? "active" : ""
          }`}
          value="Top10_Channels_Daily"
          onClick={handleSortTypeChange}
        >
          Top 10 Channels Daily
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top100_Channels_Daily" ? "active" : ""
          }`}
          value="Top100_Channels_Daily"
          onClick={handleSortTypeChange}
        >
          Top 100 Channels Daily
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top1000_Channels_Daily" ? "active" : ""
          }`}
          value="Top1000_Channels_Daily"
          onClick={handleSortTypeChange}
        >
          Top 1000 Channels Daily
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top10000_Channels_Daily" ? "active" : ""
          }`}
          value="Top10000_Channels_Daily"
          onClick={handleSortTypeChange}
        >
          Top 10000 Channels Daily
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top10_Channels_Videos" ? "active" : ""
          }`}
          value="Top10_Channels_Videos"
          onClick={handleSortTypeChange}
        >
          Top 10 Channels Videos
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top100_Channels_Videos" ? "active" : ""
          }`}
          value="Top100_Channels_Videos"
          onClick={handleSortTypeChange}
        >
          Top 100 Channels Videos
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top1000_Channels_Videos" ? "active" : ""
          }`}
          value="Top1000_Channels_Videos"
          onClick={handleSortTypeChange}
        >
          Top 1000 Channels Videos
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top10000_Channels_Videos" ? "active" : ""
          }`}
          value="Top10000_Channels_Videos"
          onClick={handleSortTypeChange}
        >
          Top 10000 Channels Videos
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top10_Channels_AverageViews" ? "active" : ""
          }`}
          value="Top10_Channels_AverageViews"
          onClick={handleSortTypeChange}
        >
          Top 10 Videos Average Views
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top100_Channels_AverageViews" ? "active" : ""
          }`}
          value="Top100_Channels_AverageViews"
          onClick={handleSortTypeChange}
        >
          Top 100 Videos Average Views
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top1000_Channels_AverageViews" ? "active" : ""
          }`}
          value="Top1000_Channels_AverageViews"
          onClick={handleSortTypeChange}
        >
          Top 1000 Videos Average Views
        </button>
        <button
          className={`sort-button ${
            activeSort === "Top10000_Channels_AverageViews" ? "active" : ""
          }`}
          value="Top10000_Channels_AverageViews"
          onClick={handleSortTypeChange}
        >
          Top 10000 Average Views
        </button>
      </div>
    );
  };
  
  export default ChannelButtonMenu;
  