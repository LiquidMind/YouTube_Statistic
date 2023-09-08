// DataLoader.js
import MyLineChart from "../MyLineChart/MyLineChart";
import "./DataLoader.css";

import most_viewed from "./data_tag/most_viewed.json";
import multfilm from "./data_tag/multfilm.json";
import multik from "./data_tag/multik.json";
import multiki from "./data_tag/multiki.json";
import trickfilm from "./data_tag/trickfilm.json";
import zeichenfilm from "./data_tag/zeichenfilm.json";
import zeichentrickfilm from "./data_tag/zeichentrickfilm.json";

const DataLoader = () => {
  const data = [
    { name: "most_viewed", data: most_viewed },
    { name: "multfilm", data: multfilm },
    { name: "multik", data: multik },
    { name: "multiki", data: multiki },
    { name: "trickfilm", data: trickfilm },
    { name: "zeichenfilm", data: zeichenfilm },
    { name: "zeichentrickfilm", data: zeichentrickfilm },
  ];

  return (
    <div className="blockCharts">
      {data.map((item, index) => (
        <div key={index} className="listCharts">
          <h3>{item.name}</h3>
          <MyLineChart data={item.data} />
        </div>
      ))}
    </div>
  );
};

export default DataLoader;
