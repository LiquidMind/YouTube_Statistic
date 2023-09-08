const { google } = require("googleapis");
const youtube = google.youtube("v3");
const { db } = require("../model/dbConnection");
const moment = require("moment");
require("dotenv").config();
const { KEY33 } = process.env;

const updateChannelDetails = () => {
  const query = `
    SELECT channel_id, current_updated_at, subscriber_count, video_count, view_count
    FROM all_channels
    WHERE add_info = 0;
    `;

  db.query(query, async (err, rows) => {
    if (err) throw err;

    const processRows = async (index) => {
      if (index >= rows.length) return;

      const channelId = rows[index].channel_id;
      const prevSubscriberCount = rows[index].subscriber_count;
      const prevVideoCount = rows[index].video_count;
      const prevViews = rows[index].view_count;
      let lastUpdatedAt = moment(rows[index].current_updated_at);
      const currentUpdatedAt = moment();

      if (!lastUpdatedAt.isValid()) {
        console.log(
          `Skipping views_per_second computation for channel ${channelId} as it's being checked for the first time.`
        );
        lastUpdatedAt = currentUpdatedAt; // This way, the time difference will be zero, and views_per_second will also be zero.
      }

      try {
        const response = await youtube.channels.list({
          key: KEY33,
          id: channelId,
          part: "snippet,contentDetails,statistics,status",
        });

        const channel = response.data.items[0];
        const currSubscriberCount = channel.statistics.subscriberCount;
        const currVideoCount = channel.statistics.videoCount;
        const currViews = channel.statistics.viewCount;

        const diffSeconds = currentUpdatedAt.diff(lastUpdatedAt, "seconds");
        const diffViews = currViews - prevViews;
        console.log(diffViews);
        const viewsPerSecond =
          diffSeconds > 0 ? Number((diffViews / diffSeconds).toFixed(6)) : null;

        const updateQuery = `
                UPDATE all_channels
                SET title = ?,
                    description = ?,
                    created_at = ?,
                    subscriber_count = ?,
                    view_count = ?,
                    video_count = ?,
                    thumbnail_url = ?,
                    country = ?,
                    is_linked = ?,
                    privacy_status = ?,
                    last_updated_at = ?,
                    current_updated_at = ?,
                    prev_subscriber_count = ?,
                    curr_subscriber_count = ?,
                    prev_video_count = ?,
                    curr_video_count = ?,
                    prev_views = ?,
                    curr_views = ?,
                    diff_views=?,
                    views_per_second = ?,
                    add_info = 1
                WHERE channel_id = ?;
                `;

        const values = [
          channel.snippet.title,
          channel.snippet.description,
          moment(channel.snippet.publishedAt).format("YYYY-MM-DD HH:mm:ss"),
          currSubscriberCount,
          currViews,
          currVideoCount,
          channel.snippet.thumbnails.default.url,
          channel.snippet.country,
          channel.status.isLinked,
          channel.status.privacyStatus,
          lastUpdatedAt.format("YYYY-MM-DD HH:mm:ss"),
          currentUpdatedAt.format("YYYY-MM-DD HH:mm:ss"),
          prevSubscriberCount,
          currSubscriberCount,
          prevVideoCount,
          currVideoCount,
          diffViews,
          prevViews,
          currViews,
          viewsPerSecond,
          channelId,
        ];

        db.query(updateQuery, values, (err) => {
          if (err) throw err;
          console.log("Updated channel:", channelId);
          setTimeout(() => {
            processRows(index + 1);
          }, 3000);
        });
      } catch (error) {
        console.error(error);
        processRows(index + 1);
      }
    };

    await processRows(0);
  });
};

updateChannelDetails();
