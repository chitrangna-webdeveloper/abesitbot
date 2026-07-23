const { users, saveUsers } = require("../utils/database");

module.exports = (bot) => {

  bot.on("message_reaction", (reaction) => {

    const id = reaction.user.id;

    if (!users[id]) return;

    users[id].reactions++;

    saveUsers();

  });

};