const { users } = require("../utils/database");

module.exports = (bot) => {

  bot.onText(/\/active/, (msg) => {

    const activeUsers = Object.values(users)
      .map(user => {

        const activity =
          user.messages +
          (user.stickers * 2) +
          (user.photos * 3) +
          (user.documents * 4) +
          user.reactions;

        return {
          name: user.name,
          activity
        };

      })
      .sort((a, b) => b.activity - a.activity)
      .slice(0, 10);

    if (activeUsers.length === 0) {
      return bot.sendMessage(msg.chat.id, "📭 No activity found.");
    }

    let text = "🔥 *Most Active Members*\n\n";

    activeUsers.forEach((user, index) => {

      text += `${index + 1}. ${user.name}\n`;
      text += `⭐ Activity Score: ${user.activity}\n\n`;

    });

    bot.sendMessage(msg.chat.id, text, {
      parse_mode: "Markdown"
    });

  });

};