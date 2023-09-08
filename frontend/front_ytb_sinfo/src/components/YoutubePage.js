import React from "react";
import "./YouTubePage.css";

const YouTubePage = ({ videoId }) => {
  console.log(videoId);
  const handleButtonClick = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <>
      <div className="youtube-page">
        <iframe
          className="youtube-player"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* <button onClick={handleButtonClick} className="youtube-button">
          Open in YouTube
        </button> */}
      </div>
    </>
  );
};

export default YouTubePage;

// Вікно нової сторінки в додатку НЕ ПРАЦЮЄ
// import React from "react";
// import "./YouTubePage.css";

// const YouTubePage = ({ videoId }) => {
//   return (
//     <div className="youtube-page">
//       <iframe
//         className="youtube-player"
//         src={`https://m.youtube.com/watch?v=${videoId}`}
//         title="YouTube Video"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// };

// export default YouTubePage;

///////// браузер в компоненті  НЕ ПРАЦЮЄ
// import React from "react";
// import Iframe from "react-iframe";

// const YouTubePage = ({ videoId }) => {
//   const url = `https://www.youtube.com/watch?v=${videoId}`;

//   return (
//     <div className="youtube-page">
//       <Iframe url={url} width="100%" height="600px" />
//     </div>
//   );
// };

// export default YouTubePage;

/////  відкриття сторінки тютюб

// import React from "react";
// import YouTube from "react-youtube";

// const YouTubePage = ({ videoId }) => {
//   const opts = {
//     width: "100%",
//     height: "600px",
//   };

//   return (
//     <div className="youtube-page">
//       <YouTube videoId={videoId} opts={opts} />
//     </div>
//   );
// };

// export default YouTubePage;

///   створюємо HTML на сервері
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const YouTubePage = ({ videoId }) => {
//   const [pageHtml, setPageHtml] = useState("");

//   useEffect(() => {
//     const fetchYouTubePage = async () => {
//       try {
//         const response = await axios.get(`/api/video/${videoId}`);
//         const html = response.data;
//         setPageHtml(html);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchYouTubePage();
//   }, [videoId]);

//   return <div dangerouslySetInnerHTML={{ __html: pageHtml }}></div>;
// };

// export default YouTubePage;

// Основна проблема з вашим кодом сервера полягає в тому, що ви намагаєтеся отримати сторінку YouTube, використовуючи axios, з прямим запитом до https://www.youtube.com/watch?v=${videoId}. Однак, YouTube блокує запити з сервера через політику CORS (Cross-Origin Resource Sharing).

// Оскільки ви не можете отримати сторінку YouTube напряму з сервера через CORS, вам потрібно використовувати інші способи отримання інформації про відео з YouTube. Одним з таких способів є використання YouTube API.

// створюємо екран
// import React from "react";
// import Iframe from "react-iframe";

// const YouTubePage = ({ videoId }) => {
//   return (
//     <div className="youtube-page">
//       <Iframe
//         url={`https://www.youtube.com/embed/${videoId}`}
//         width="100%"
//         height="100%"
//         display="initial"
//         position="relative"
//         allowFullScreen
//       />
//     </div>
//   );
// };

// export default YouTubePage;
