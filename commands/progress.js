const { users } = require("../utils/database");
const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

  bot.onText(/\/progress/, async (msg) => {

    const id = msg.from.id;

    if (!users[id]) {
      const sent = await bot.sendMessage(
        msg.chat.id,
        "❌ No progress found. Start participating 🚀"
      );

      autoDelete(bot, msg.chat.id, sent.message_id);
      autoDelete(bot, msg.chat.id, msg.message_id);
      return;
    }

    const user = users[id];

    const sent = await bot.sendMessage(
      msg.chat.id,
`📊 *Your ABESIT Buddy Progress*

👤 Name: ${user.name}

🔥 Coding
✅ Tasks Completed: ${user.tasks}
⭐ XP Score: ${user.points}

💬 Community
📝 Messages: ${user.messages}
🎭 Stickers: ${user.stickers}
📷 Photos: ${user.photos}
📄 Documents: ${user.documents}
❤️ Reactions: ${user.reactions}

📅 Joined: ${user.joined}

🚀 Keep Growing!`,
      {
        parse_mode: "Markdown"
      }
    );

    // Auto delete both bot reply and user's command
    autoDelete(bot, msg.chat.id, sent.message_id);
    autoDelete(bot, msg.chat.id, msg.message_id);

  });

};