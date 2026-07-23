const { owner, admins } = require("../config/admins");

module.exports = function isAdmin(userId) {
    return userId === owner || admins.includes(userId);
};