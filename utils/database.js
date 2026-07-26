const fs = require("fs");
const path = require("path");

const userFile = path.join(__dirname, "..", "users.json");

let users = {};

if (fs.existsSync(userFile)) {
  users = JSON.parse(fs.readFileSync(userFile, "utf8"));
}

function saveUsers() {
  fs.writeFileSync(
    userFile,
    JSON.stringify(users, null, 2),
    "utf8"
  );
}

module.exports = {
  users,
  saveUsers
};
