const fs = require("fs");

const userFile = "./users.json";

let users = {};

if (fs.existsSync(userFile)) {
  users = JSON.parse(fs.readFileSync(userFile));
}

function saveUsers() {
  fs.writeFileSync(
    userFile,
    JSON.stringify(users, null, 2)
  );
}

module.exports = {
  users,
  saveUsers
};