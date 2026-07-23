const { users } = require("../utils/database");
const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

  bot.onText(/\/monthly/, async (msg) => {

    const champions = Object.values(users)
      .sort((a, b) => (b.monthlyXP || 0) - (a.monthlyXP || 0))
      .slice(0, 10);

    if (champions.length === 0) {
      const sent = await bot.sendMessage(
        msg.chat.id,
        "📭 No monthly data found."
      );

      autoDelete(bot, msg.chat.id, sent.message_id);
      autoDelete(bot, msg.chat.id, msg.message_id);
      return;
    }

    let text = "🏆 *Monthly Champions*\n\n";

    champions.forEach((user, index) => {

      const medal =
        index === 0 ? "🥇" :
        index === 1 ? "🥈" :
        index === 2 ? "🥉" : "🏅";

      text += `${medal} ${user.name}\n`;
      text += `⭐ ${user.monthlyXP || 0} XP\n`;
      text += `✅ ${user.monthlyTasks || 0} Tasks\n\n`;

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