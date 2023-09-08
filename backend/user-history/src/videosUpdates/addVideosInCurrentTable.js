const { db } = require("../model/dbConnection");

const addVideosInCurrentTable = () => {
  const sqlQuery = `SELECT id,timeDate,viewes, okLike FROM videos_all WHERE addUpdates = 0 AND (viewes != 0 OR okLike != 0)`;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
    }

    for (const resObj of results) {
      const id = resObj.id;
      const viewes = resObj.viewes;
      const okLike = resObj.okLike;
      const timeDate = resObj.timeDate;

      const sqlQuery = `INSERT INTO videos_current (video_id, curr_datetime, curr_views, curr_likes) VALUES (?,?,?,?)`;

      db.query(
        sqlQuery,
        [id, timeDate, viewes, okLike], // Виправлено: змінено на чотири значення
        (err) => {
          if (err) {
            console.log(err);
          }
          console.log(`дані записані в таблицю videos_current`);
          const sqlQuery = `UPDATE videos_all SET addUpdates=1 WHERE id = ?`;
          db.query(sqlQuery, [id], (err) => {
            if (err) {
              console.log(err);
            }
            console.log(`addUpdates оновлене в ${id}`);
          });
        }
      );
    }
  });
};

// Запускаємо функцію кожні 5 секунди
setInterval(addVideosInCurrentTable, 5000);
