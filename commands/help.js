module.exports = (bot) => {

  bot.onText(/\/help/, (msg) => {

    bot.sendMessage(
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
📜 /rules - Group Rules
💡 /motivation - Get a Motivational Quote
🛠️ /admin - Admin Panel (Admins Only)

🚀 *More exciting features coming soon...*`,
      {
        parse_mode: "Markdown",
      }
    );

  });

};