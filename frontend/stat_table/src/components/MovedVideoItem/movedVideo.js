const MovedVideoInfo = ({ video }) => {

  console.log(video)
  
  return (
    <tr>
      <td colSpan="3">
        <span style={{ color: 'blue' }}>Відео </span> 
        <span style={{ color: 'green' }}>"{video.title}" </span>
        <span style={{ color: 'orange' }}>ID: </span>
        <span style={{ color: 'red' }}>{video.id} </span>
        <span style={{ color: 'black' }}>було переміщено з рядка </span>
        <span style={{ color: 'purple' }}> {video.oldOrder+1} </span>
        <span style={{ color: 'black' }}>на рядок </span>
        <span style={{ color: 'brown' }}>{video.newOrder+1}</span>.
      </td>
    </tr>
  );
};

export default MovedVideoInfo;
