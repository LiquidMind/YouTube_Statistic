const { db } = require('../model/dbConnection');

const insertUniqueChannels = () => {

  const add_Info = 0
  const query = `
    SELECT *
    FROM (
      SELECT channel_id, channel_title, ROW_NUMBER() OVER(PARTITION BY channel_id ORDER BY channel_id) AS rn
      FROM videos_all
      WHERE channel_id IS NOT NULL
    ) AS subquery
    WHERE subquery.rn = 1;
  `;

  db.query(query, (err, rows) => {
    if (err) throw err;

    rows.forEach(row => {
      if (row.channel_id === null) {
        console.log('Пропускаємо рядок з channel_id = NULL');
        return; // Пропускаємо поточний рядок і переходимо до наступного
      }

      const checkQuery = `SELECT * FROM all_channels WHERE channel_id = ?`;

      db.query(checkQuery, [row.channel_id], (err, result) => {
        if (err) throw err;

        // If the channel_id does not exist in the channels table, insert it
        if (result.length === 0) {
          const insertQuery = `
            INSERT INTO all_channels (channel_id, title, add_Info) 
            VALUES (?, ?,?);
          `;

          db.query(insertQuery, [row.channel_id, row.channel_title,add_Info], (err, result) => {
            if (err) throw err;
            console.log('Inserted:', result.affectedRows);
          });
        } else {
          console.log('Channel ID already exists, skipping:', row.channel_id);
        }
      });
    });
  });
};

insertUniqueChannels();
