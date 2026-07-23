const { users } = require("../utils/database");
const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

  bot.onText(/\/active/, async (msg) => {

    const activeUsers = Object.values(users)
      .map(user => {

        const activity =
          (user.messages || 0) +
          ((user.stickers || 0) * 2) +
          ((user.photos || 0) * 3) +
          ((user.documents || 0) * 4) +
          (user.reactions || 0);

        return {
          name: user.name,
          activity
        };

      })
      .sort((a, b) => b.activity - a.activity)
      .slice(0, 10);

    if (activeUsers.length === 0) {
      const sent = await bot.sendMessage(
        msg.chat.id,
        "📭 No activity found."
      );

      autoDelete(bot, msg.chat.id, sent.message_id);
      autoDelete(bot, msg.chat.id, msg.message_id);
      return;
    }

    let text = "🔥 *Most Active Members*\n\n";

    activeUsers.forEach((user, index) => {

      const medal =
        index === 0 ? "🥇" :
        index === 1 ? "🥈" :
        index === 2 ? "🥉" : "🏅";

      text += `${medal} ${user.name}\n`;
      text += `⭐ Activity Score: ${user.activity}\n\n`;

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