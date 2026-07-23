const { users } = require("../utils/database");
const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

  bot.onText(/\/leaderboard/, async (msg) => {

    const sorted = Object.values(users)
      .sort((a, b) => (b.points || 0) - (a.points || 0))
      .slice(0, 10);

    if (sorted.length === 0) {
      const sent = await bot.sendMessage(
        msg.chat.id,
        "📭 No users found."
      );

      autoDelete(bot, msg.chat.id, sent.message_id);
      autoDelete(bot, msg.chat.id, msg.message_id);
      return;
    }

    let text = "🏆 *ABESIT Buddy Leaderboard*\n\n";

    sorted.forEach((user, index) => {
      const medal =
        index === 0 ? "🥇" :
        index === 1 ? "🥈" :
        index === 2 ? "🥉" : "🏅";

      text += `${medal} ${user.name} — *${user.points || 0} XP*\n`;
    });

    const sent = await bot.sendMessage(
      msg.chat.id,
      text,
      {
        parse_mode: "Markdown"
      }
    );

    // Auto delete bot reply and user's command
    autoDelete(bot, msg.chat.id, sent.message_id);
    autoDelete(bot, msg.chat.id, msg.message_id);

  });

};