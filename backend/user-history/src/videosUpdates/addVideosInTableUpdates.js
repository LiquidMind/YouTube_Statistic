const { db } = require("../model/dbConnection");

const addVideosInTableUpdates = () => {
  console.log("Перевіряємо наявність нових даних...");

  const sqlQuery = `
    INSERT INTO videos_updates (video_id, prev_datetime, prev_views, prev_likes, curr_datetime, curr_views, curr_likes, updates, iteration)
    SELECT v.id, null, null, null, v.timeDate, v.viewes, v.okLike, 0, 0
    FROM videos_all v
    LEFT JOIN videos_updates u ON v.id = u.video_id
    WHERE u.video_id IS NULL AND v.addUpdates = 0 AND (v.viewes != 0 OR v.okLike != 0)
  `;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      if (results.affectedRows > 0) {
        console.log("Дані, які відсутні в videos_updates, було успішно додано");
      }

      const updateSql = `UPDATE videos_all v SET v.addUpdates=1 WHERE v.id IN (SELECT u.video_id FROM videos_updates u)`;

      db.query(updateSql, (err, updateResults) => {
        if (err) {
          console.log(err);
        } else {
          if (updateResults.changedRows > 0) {
            console.log("addUpdates в таблиці videos_all було оновлено");
          }
        }
      });
    }
  });
};

// Запускаємо функцію кожні 3 секунди
setInterval(addVideosInTableUpdates, 3000);
