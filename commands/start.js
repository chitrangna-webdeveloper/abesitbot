module.exports = (bot) => {

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      `🎉 *Welcome to ABESIT Buddy!*

👋 Hello *${msg.from.first_name}*,

I'm your coding assistant 🤖

Type /help to see all available commands.

🚀 Happy Coding!`,
      {
        parse_mode: "Markdown",
      }
    );
  });

};