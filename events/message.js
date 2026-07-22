const { users, saveUsers } = require("../utils/database");

module.exports = (bot) => {

  bot.on("message", (msg) => {

    if (!msg.from) return;

    const id = msg.from.id;

    // New User
    if (!users[id]) {

      users[id] = {
        name: msg.from.first_name,
        points: 0,
        tasks: 0,
        messages: 0,
        stickers: 0,
        photos: 0,
        documents: 0,
        reactions: 0,
        joined: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }),
        lastDone: 0
      };

    }

    // Ignore Commands
    if (msg.text && !msg.text.startsWith("/")) {
      users[id].messages++;
    }

    // Sticker
    if (msg.sticker) {
      users[id].stickers++;
    }

    // Photo
    if (msg.photo) {
      users[id].photos++;
    }

    // Document
    if (msg.document) {
      users[id].documents++;
    }

    saveUsers();

  });

};