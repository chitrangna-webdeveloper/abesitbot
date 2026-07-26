const { users, saveUsers } = require("../utils/database");
const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

  bot.onText(/\/done/, async (msg) => {

    const id = msg.from.id;
    const name = msg.from.first_name;
    const now = Date.now();

    // New User
    if (!users[id]) {
      users[id] = {
        name: name,
        points: 0,
        tasks: 0,
        messages: 0,
        stickers: 0,
        reactions: 0,
        photos: 0,
        documents: 0,
        joined: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }),
        lastDone: 0,
        nickname: "No Rank Yet"
      };
    }

    // Check if 24 hours have passed
    const timePassed = now - users[id].lastDone;

    if (timePassed < 24 * 60 * 60 * 1000) {

      const remaining = Math.ceil(
        (24 * 60 * 60 * 1000 - timePassed) / (1000 * 60 * 60)
      );

      const sent = await bot.sendMessage(
        msg.chat.id,
        `⏳ ${name}, you already completed today's task.\n\n🔥 Come back after ${remaining} hours!`
      );

      autoDelete(bot, msg.chat.id, sent.message_id);
      autoDelete(bot, msg.chat.id, msg.message_id);
      return;
    }

    // ✅ Fixed Points
    const points = 250;

    users[id].points += points;
    users[id].tasks += 1;
    users[id].lastDone = now;
    users[id].name = name;

    // Automatic Nickname
    if (users[id].tasks >= 100) {
      users[id].nickname = "👑 Code Legend";
    } else if (users[id].tasks >= 50) {
      users[id].nickname = "🥇 Code Master";
    } else if (users[id].tasks >= 30) {
      users[id].nickname = "🚀 Rising Developer";
    } else if (users[id].tasks >= 15) {
      users[id].nickname = "💻 Consistent Coder";
    } else if (users[id].tasks >= 5) {
      users[id].nickname = "🌟 Beginner Coder";
    }

    // Save Data
    saveUsers();

    const sent = await bot.sendMessage(
      msg.chat.id,
      `🎉 *Well Done ${name}!* 👏

✅ Task Completed Successfully

⭐ Earned: *${points} XP*

🏆 Total XP: *${users[id].points}*

📚 Tasks Completed: *${users[id].tasks}*

🏅 Nickname: *${users[id].nickname || "No Rank Yet"}*

🚀 Keep Coding!`,
      {
        parse_mode: "Markdown"
      }
    );

    autoDelete(bot, msg.chat.id, sent.message_id);
    autoDelete(bot, msg.chat.id, msg.message_id);

  });

};
