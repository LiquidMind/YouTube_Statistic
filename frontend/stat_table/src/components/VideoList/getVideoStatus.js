 const getVideoStatus = (video) => {
    let videoStatus = "unchanged";
    if (video.old_video_id === null && video.new_video_id !== null) {
      videoStatus = "added";
    } else if (video.new_video_id === null && video.old_order !== null) {
      videoStatus = "deleted";
    } else if (
      video.old_video_id !== null &&
      video.new_video_id !== null &&
      video.old_video_id !== video.new_video_id
    ) {
      videoStatus = "reordered";
    } else if (video.old_order !== video.new_order) {
      videoStatus = "reordered";
    }
    return videoStatus;
  };
  
  export default getVideoStatus