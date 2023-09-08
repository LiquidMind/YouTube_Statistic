const mysql = require("mysql2/promise");

function ensureNotNull(value) {
  return value !== undefined ? value : null;
}

async function updatePlaylistDb(
  topX,
  key,
  orderQuery,
  title,
  description,
  sort,
  table_name
) {
  console.log("Updating playlist with title:", title);

  require("dotenv").config();

  const { HOST, USER, DATABASE, PASSWORD } = process.env;

  const db = mysql.createPool({
    host: HOST,
    user: "root",
    database: DATABASE,
    password: PASSWORD,
    charset: "utf8mb4",
  });

  exports.db = db;

  const {
    playlists_all,
    playlists_content,
    playlists_content_updates,
    playlists_updates,
    playlist_versions,
    playlist_version_content,
    all_table,
    ids,
  } = table_name;

  console.log(`WWWWWWWWWWW${playlists_all}`);

  const [videos] = await connection.execute(
    `SELECT ${ids} FROM ${all_table} ${orderQuery} LIMIT ${topX}`
  );
  const [playlists] = await connection.execute(
    `SELECT playlist_id, title, description FROM ${playlists_all} WHERE user_id = 0 AND key_playlist = ?`,
    [ensureNotNull(key)]
  );

  let playlistId;
  let oldTitle = null;
  let oldDescription = null;
  let newVersionName = "V_1";
  let latestVersionNumber = 0;

  if (playlists.length > 0) {
    playlistId = playlists[0].playlist_id;
    oldTitle = playlists[0].title;
    oldDescription = playlists[0].description;

    const [latestVersion] = await connection.execute(
      `SELECT version_name, version_date FROM ${playlist_versions} WHERE playlist_id = ? ORDER BY version_date DESC LIMIT 1`,
      [playlistId]
    );

    if (latestVersion.length > 0 && latestVersion[0].version_name) {
      latestVersionNumber = parseInt(
        latestVersion[0].version_name.split("_")[1],
        10
      );
      if (!isNaN(latestVersionNumber)) {
        newVersionName = "V_" + (latestVersionNumber + 1);
      }
    }
    newVersionName = "V_" + (latestVersionNumber + 1);
  } else {
    const [result] = await connection.execute(
      `INSERT INTO ${playlists_all} (user_id, title, description, key_playlist) VALUES (0, ?, ?, ?)`,
      [ensureNotNull(title), ensureNotNull(description), ensureNotNull(key)]
    );

    playlistId = result.insertId;
  }

  await connection.execute(
    `UPDATE ${playlists_content} SET deleted_at = CURRENT_TIMESTAMP WHERE playlist_id = ?`,
    [playlistId]
  );

  for (let i = 0; i < videos.length; i++) {
    const videoId = videos[i][ids];

    await connection.execute(
      `INSERT INTO ${playlists_content} (playlist_id, order_num, video_id) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE video_id = VALUES(video_id), deleted_at = NULL`,
      [playlistId, i + 1, ensureNotNull(videoId)]
    );
  }

  const [versionResult] = await connection.execute(
    `INSERT INTO ${playlist_versions} (playlist_id, version_name) VALUES (?, ?)`,
    [playlistId, ensureNotNull(newVersionName)]
  );
  const versionId = versionResult.insertId;

  for (let i = 0; i < videos.length; i++) {
    const videoId = videos[i][ids];
    await connection.execute(
      `INSERT INTO ${playlist_version_content} (version_id, order_num, video_id, playlist_name, version_name) VALUES (?, ?, ?, ?, ?)`,
      [
        versionId,
        i + 1,
        ensureNotNull(videoId),
        ensureNotNull(title),
        ensureNotNull(newVersionName),
      ]
    );
  }
  console.log("Latest version number:", latestVersionNumber);
  console.log("New version name:", newVersionName);
  await connection.execute(
    `UPDATE ${playlists_all} SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP, sort = ? WHERE playlist_id = ?`,
    [
      ensureNotNull(title),
      ensureNotNull(description),
      ensureNotNull(sort),
      playlistId,
    ]
  );

  await connection.execute(
    `INSERT INTO ${playlists_updates} (playlist_id, old_title, new_title, old_description, new_description) VALUES (?, ?, ?, ?, ?)`,
    [
      playlistId,
      ensureNotNull(oldTitle),
      ensureNotNull(title),
      ensureNotNull(oldDescription),
      ensureNotNull(description),
    ]
  );

  await connection.end();
}

module.exports = updatePlaylistDb;
