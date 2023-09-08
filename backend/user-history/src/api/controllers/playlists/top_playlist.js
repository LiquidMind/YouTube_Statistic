
const { db } = require("../../../model/dbConnection");

const top_playlist = (req, res) => {
  const title = req.query.title;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  if (!title) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Title parameter is required",
    });
  }

  const videoUpdatesQuery = `
SELECT
  video_id,
  prev_likes,
  prev_views
FROM
  videos_updates
WHERE
  video_id = ?
`;

  const playlistQuery = `
SELECT
  playlists.playlist_id,
  playlists_content.video_id,
  videos_all.*,
  tpcu.*
FROM
  playlists
INNER JOIN
  playlists_content ON playlists.playlist_id = playlists_content.playlist_id
INNER JOIN
  videos_all ON playlists_content.video_id = videos_all.id
LEFT JOIN (
  SELECT *
  FROM playlists_content_updates
  WHERE (playlist_id, iteration) IN (
    SELECT playlist_id, MAX(iteration)
    FROM playlists_content_updates
    GROUP BY playlist_id
  )
) tpcu ON tpcu.playlist_id = playlists.playlist_id AND tpcu.new_video_id = playlists_content.video_id
WHERE
  playlists.title = ?
  AND videos_all.statusSub != 'onVideo'
ORDER BY playlists_content.order_num
LIMIT ${limit} OFFSET ${offset};
`;

  const deletedVideosQuery = `
SELECT
  tpcu.*
FROM
  playlists_content_updates AS tpcu
WHERE
  tpcu.playlist_id = ?
  AND tpcu.new_video_id IS NULL
  AND tpcu.old_video_id IS NOT NULL
  AND tpcu.iteration = (
    SELECT
      MAX(tpcu2.iteration)
    FROM
      playlists_content_updates AS tpcu2
    WHERE
      tpcu2.playlist_id = tpcu.playlist_id
  );

`;

db.query(playlistQuery, [title], (err, playlistResult) => {
  if (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
    });
  } else {
    db.query(
      deletedVideosQuery,
      [playlistResult[0].playlist_id],
      (err, deletedVideosResult) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal server error",
          });
        } else {
          // Додаткова обробка для додавання prev_likes та prev_views до кожного відео
          const tasks = playlistResult.map((video) => {
            return new Promise((resolve) => {
              db.query(videoUpdatesQuery, [video.video_id], (err, videoUpdatesResult) => {
                if (err) {
                  console.log(err);
                  resolve(video); // Continue with the original data if error
                } else {
                  resolve({
                    ...video,
                    prev_likes: videoUpdatesResult[0]?.prev_likes,
                    prev_views: videoUpdatesResult[0]?.prev_views,
                  });
                }
              });
            });
          });

          Promise.all(tasks).then((playlistWithVideoUpdates) => {
            res.status(200).json({
              status: "success",
              code: 200,
              result: {
                playlist: playlistWithVideoUpdates,
                deletedVideos: deletedVideosResult,
              },
            });
          });
        }
      }
    );
  }
});
};

module.exports = top_playlist;
