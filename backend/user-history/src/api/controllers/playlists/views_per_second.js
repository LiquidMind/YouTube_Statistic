// const { db } = require("../../../model/dbConnection");

// const views_per_second = (req, res) => {
//   const page = req.query.page || 1; // За замовчуванням використовується сторінка 1
//   const pageSize = 10; // Кількість відео на сторінку
//   const offset = (page - 1) * pageSize;

//   const sqlQuery = `SELECT * FROM videos_all ORDER BY views_per_second DESC LIMIT ${offset}, ${pageSize}`;
//   db.query(sqlQuery, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.status(200).json({
//         status: "success",
//         code: 200,
//         result: result,
//       });
//     }
//   });
// };

// module.exports = views_per_second;
const { db } = require("../../../model/dbConnection");

const views_per_second = (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  const sqlQuery = `SELECT * FROM videos_all ORDER BY views_per_second DESC LIMIT ${offset}, ${limit}`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        result: result,
      });
    }
  });
};

module.exports = views_per_second;
