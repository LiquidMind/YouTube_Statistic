const { getAndProcessVideos } = require("./getAndProcessVideos"); // Адаптуйте шлях до ваших файлів
const updatePlaylistDb = require("./updatePlaylistDb");
const playlists = require("./pleylists_arr");

const playlists_all = "playlists";
const playlists_content = "playlists_content";
const playlists_content_updates = "playlists_content_updates";
const playlists_updates = "playlists_updates";
const playlist_versions = "playlist_versions";
const playlist_version_content = "playlist_version_content";
const all_table = "videos_all";
const ids = "id";

const tables_channels = {
  playlists_all,
  playlists_content_updates,
  playlists_updates,
  playlist_version_content,
  playlists_content,
  playlist_versions,
  all_table,
  ids,
};

async function getProcessAndUpdate() {
  try {
    await getAndProcessVideos(playlists, tables_channels);

    for (const playlist of playlists) {
      await updatePlaylistDb(
        playlist.topX,
        playlist.key,
        playlist.orderQuery,
        playlist.title,
        playlist.description,
        playlist.sort,
        tables_channels
      );
    }
  } catch (error) {
    console.error(error);
  }
}

getProcessAndUpdate();
