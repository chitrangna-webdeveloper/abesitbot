const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

  bot.onText(/\/help/, async (msg) => {

    const sent = await bot.sendMessage(
      msg.chat.id,
      `📚 *ABESIT Buddy Commands*

🏠 /start - Welcome Message
❓ /help - Show All Commands
🏫 /about - About ABESIT
💻 /task - Get Today's Coding Task
✅ /done - Mark Today's Task Complete
📊 /progress - Check Your Progress
🏆 /leaderboard - Top XP Rankings
👑 /monthly - Monthly Champions
😂 /joke - Get a Random Funny Joke
🎖️ /rank - Check Your Rank

🚀 *More exciting features coming soon...*`,
      {
        parse_mode: "Markdown",
      }
    );

    // Bot ka reply 5 sec baad delete
    autoDelete(bot, msg.chat.id, sent.message_id);

    // User ka /help command bhi 5 sec baad delete
    autoDelete(bot, msg.chat.id, msg.message_id);

  });

};