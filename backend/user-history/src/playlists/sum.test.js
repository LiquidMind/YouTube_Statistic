// const { getVideoIds } = require("./getPlaylistUpdates");
// const { db } = require("../model/dbConnection");

// jest.mock("../model/dbConnection");

// describe("getVideoIds", () => {
//   it("Should handle errors correctly", (done) => {
//     const mockError = new Error("Test Error");
//     db.query = jest
//       .fn()
//       .mockImplementation((_, cb) => cb(mockError, null, null));

//     getVideoIds((err, _, __) => {
//       expect(err).toBe(mockError);
//       done();
//     });
//   });

//   it("Should parse database results correctly", (done) => {
//     const mockResults = [
//       { new_video_id: "1", old_video_id: "2" },
//       { new_video_id: "3", old_video_id: "4" },
//     ];
//     db.query = jest.fn().mockImplementation((_, cb) => cb(null, mockResults));

//     getVideoIds((err, newVideoIds, oldVideoIds) => {
//       expect(err).toBeNull();
//       expect(newVideoIds).toEqual(["1", "3"]);
//       expect(oldVideoIds).toEqual(["2", "4"]);
//       done();
//     });
//   });
// });
const sum = require("./sum");

test("додає 1 + 2 і отримує 3", () => {
  expect(sum(1, 2)).toBe(3);
});
module.exports = sum;
