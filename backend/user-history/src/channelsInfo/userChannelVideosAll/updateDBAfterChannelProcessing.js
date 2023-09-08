function updateDBAfterChannelProcessing(channelId) {
  return new Promise((resolve, reject) => {
    const query = `
            UPDATE all_channels
            SET save_videos = 1, date_save_videos = NOW()
            WHERE channel_id = ?
        `;

    db.query(query, [channelId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export default updateDBAfterChannelProcessing;
