// import React from "react";
// import { FaMinus } from "react-icons/fa";
// const DeletedVideoItem = ({ deletedVideo }) => {
//   return (
//     <tr>
//       <td>
//         <FaMinus />
//       </td>
//       <td>{deletedVideo.old_video_id}</td>
//       <td>{deletedVideo.updated_at}</td>
//       {/* і так далі, залежно від того, які дані ви хочете відобразити */}
//     </tr>
//   );
// };

// export default DeletedVideoItem;

import React from "react";
import { FaMinus } from "react-icons/fa";
import "./DeletedVideoItem.css";

const DeletedVideoItem = ({ deletedVideo }) => {
  const updatedDate = new Date(deletedVideo.updated_at);
  const formattedTime = `${updatedDate.toLocaleDateString()} ${updatedDate.toLocaleTimeString()}`;

  return (
    <>
      <td> {deletedVideo.old_order}</td>
      <td className="deleted">
        <FaMinus /> deleted
      </td>
      <td>title</td>
      <td>views</td>
      <td>{(deletedVideo.views_per_second * 60 * 60 * 24).toFixed(0)}</td>
      <td>{deletedVideo.okLike}</td>
      <td>{(deletedVideo.likes_per_second * 60 * 60 * 24).toFixed(0)}</td>
      <td>
        <a
          href={`https://www.youtube.com/watch?v=${deletedVideo.old_video_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {deletedVideo.old_video_id}
        </a>
      </td>
      <td>{formattedTime}</td>
      <td> {/* Пуста клітинка для колонки "Video Player" */}</td>
    </>
  );
};

export default DeletedVideoItem;
