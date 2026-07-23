const { users } = require("../utils/database");

module.exports = (bot) => {

  bot.onText(/\/rank/, (msg) => {

    const id = msg.from.id;

    if (!users[id]) {
      return bot.sendMessage(
        msg.chat.id,
        "❌ Please use /start first."
      );
    }

    // XP ke hisaab se sort
    const sorted = Object.entries(users)
      .sort(([, a], [, b]) => (b.points || 0) - (a.points || 0));

    // User ki rank nikalo
    const rank = sorted.findIndex(([userId]) => userId == id) + 1;

    const totalUsers = sorted.length;
    const user = users[id];

    bot.sendMessage(
      msg.chat.id,
      `🏅 *Your Rank*

👤 Name: *${user.name}*
🏆 Rank: *#${rank} / ${totalUsers}*
⭐ XP: *${user.points || 0}*

🚀 Keep completing tasks to reach *Rank #1*!`,
      {
        parse_mode: "Markdown",
      }
    );

  });

};