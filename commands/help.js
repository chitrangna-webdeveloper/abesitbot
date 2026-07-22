module.exports = (bot) => {

  bot.onText(/\/help/, (msg) => {

    bot.sendMessage(
      msg.chat.id,
      `📚 *ABESIT Buddy Commands*

🏠 /start - Welcome Message
❓ /help - Show Commands
💻 /task - Get Today's Coding Task
✅ /done - Mark Task Complete
📊 /progress - Check Your Progress

✨ More features coming soon...`,
      {
        parse_mode: "Markdown",
      }
    );

  });

};