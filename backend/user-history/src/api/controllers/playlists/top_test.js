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

  const sqlQuery = `
SELECT
  test_playlists.playlist_id,
  test_playlists_content.video_id,
  videos_all.*,
  test_playlists_content_updates.*
FROM
  test_playlists
INNER JOIN
  test_playlists_content ON test_playlists.playlist_id = test_playlists_content.playlist_id
INNER JOIN
  videos_all ON test_playlists_content.video_id = videos_all.id
LEFT JOIN
  test_playlists_content_updates ON test_playlists_content.video_id = test_playlists_content_updates.new_video_id
WHERE
  test_playlists.title = ? AND videos_all.statusSub != 'onVideo'
LIMIT ${limit} OFFSET ${offset};
  `;

  db.query(sqlQuery, [title], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal server error",
      });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        result: result,
      });
    }
  });
};

module.exports = top_playlist;
