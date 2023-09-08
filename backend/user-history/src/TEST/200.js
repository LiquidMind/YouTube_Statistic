const fs = require("fs");
const { result } = require("lodash");

const a = fs.readFile(
  "/Users/andrijkozevnikov/Documents/ProjectYoutube/Archive/auth2/client_secret.json",
  (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(JSON.parse(result));
  }
);
