// const { db } = require("../../../model/dbConnection");

// const videos_all = async (req, res) => {
//   const ids = req.query.old_video_id; // Припускаючи, що клієнт надсилає масив ідентифікаторів
//   console.log(`RESULTS: ${ids}`);

//   const sqlQuery = `SELECT titleUrl FROM videos_all WHERE id="${id}"`; // Використовуйте "IN", щоб отримати дані для кількох ідентифікаторів

//   db.query(sqlQuery, (err, result) => {
//     if (err) {
//       console.log(err);
//       res
//         .status(500)
//         .json({ status: "error", message: "Internal server error" });
//     } else {
//       console.log(`РЕЗУЛЬТАТ ${result}`);

//       res.status(200).json({
//         status: "success",
//         code: 200,
//         result: result,
//       });
//       console.log(result);
//     }
//   });
// };

// module.exports = videos_all;
