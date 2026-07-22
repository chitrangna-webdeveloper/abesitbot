const { users } = require("../utils/database");

module.exports = (bot) => {

  bot.onText(/\/monthly/, (msg) => {

    const champions = Object.values(users)
      .sort((a, b) => b.monthlyXP - a.monthlyXP)
      .slice(0, 10);

    if (champions.length === 0) {
      return bot.sendMessage(msg.chat.id, "📭 No monthly data found.");
    }

    let text = "🏆 *Monthly Champions*\n\n";

    champions.forEach((user, index) => {

      const medal =
        index === 0 ? "🥇" :
        index === 1 ? "🥈" :
        index === 2 ? "🥉" : "🏅";

      text += `${medal} ${user.name}\n`;
      text += `⭐ ${user.monthlyXP} XP\n`;
      text += `✅ ${user.monthlyTasks} Tasks\n\n`;

    });

    bot.sendMessage(msg.chat.id, text, {
      parse_mode: "Markdown"
    });

  });

};