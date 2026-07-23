const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

  bot.onText(/\/start/, async (msg) => {

    const isPrivate = msg.chat.type === "private";
    const sent = await bot.sendMessage(
      msg.chat.id,
      `🎉 *Welcome to ABESIT Buddy!*

👋 Hello *${msg.from.first_name}*,

I'm your coding assistant 🤖

Type /help to see all available commands.

🚀 Happy Coding!`,
      {
        parse_mode: "Markdown",
        ...(isPrivate && { message_effect_id: "5046509860389126442" })
      }
    );

    // Auto delete bot reply and user's command
    autoDelete(bot, msg.chat.id, sent.message_id);
    autoDelete(bot, msg.chat.id, msg.message_id);

  });

};