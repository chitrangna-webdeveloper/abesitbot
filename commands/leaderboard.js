const { users } = require("../utils/database");

module.exports = (bot) => {

  bot.onText(/\/leaderboard/, (msg) => {

    const sorted = Object.values(users)
      .sort((a, b) => b.points - a.points)
      .slice(0, 10);

    if (sorted.length === 0) {
      return bot.sendMessage(msg.chat.id, "📭 No users found.");
    }

    let text = "🏆 *ABESIT Buddy Leaderboard*\n\n";

    sorted.forEach((user, index) => {
      text += `${index + 1}. 🥇 ${user.name} — *${user.points} XP*\n`;
    });

    bot.sendMessage(msg.chat.id, text, {
      parse_mode: "Markdown"
    });

  });

};