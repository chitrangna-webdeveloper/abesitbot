const { users } = require("../utils/database");
const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

  bot.onText(/\/rank/, async (msg) => {

    const id = msg.from.id;

    if (!users[id]) {
      const sent = await bot.sendMessage(
        msg.chat.id,
        "❌ Please use /start first."
      );

      autoDelete(bot, msg.chat.id, sent.message_id);
      autoDelete(bot, msg.chat.id, msg.message_id);
      return;
    }

    // XP ke hisaab se sort
    const sorted = Object.entries(users)
      .sort(([, a], [, b]) => (b.points || 0) - (a.points || 0));

    // User ki rank nikalo
    const rank = sorted.findIndex(([userId]) => userId == id) + 1;

    const totalUsers = sorted.length;
    const user = users[id];

    const sent = await bot.sendMessage(
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

    // Auto delete bot reply and user's command
    autoDelete(bot, msg.chat.id, sent.message_id);
    autoDelete(bot, msg.chat.id, msg.message_id);

  });

};