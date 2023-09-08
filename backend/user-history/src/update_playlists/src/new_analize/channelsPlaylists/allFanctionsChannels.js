const { getAndProcessVideos } = require("../getAndProcessVideos"); // Адаптуйте шлях до ваших файлів
const updatePlaylistDb = require("../updatePlaylistDb");

const playlists_channels_arr = require("./playlists_channels_arr");

// tablet_name
const playlists_all = "playlists_channels";
const playlists_content = "playlists_channels_content";
const playlists_content_updates = "playlists_channels_content_updates";
const playlists_updates = "playlists_channels_updates";
const playlist_versions = "playlist_channels_versions";
const playlist_version_content = "playlist_channels_version_content";
const all_table = "all_channels";
const ids = "channel_id";

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
    await getAndProcessVideos(playlists_channels_arr, tables_channels);

    for (const playlist of playlists_channels_arr) {
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
