const { users } = require("../utils/database");

module.exports = (bot) => {

  bot.onText(/\/progress/, (msg) => {

    const id = msg.from.id;

    if (!users[id]) {
      return bot.sendMessage(
        msg.chat.id,
        "❌ No progress found. Start participating 🚀"
      );
    }

    const user = users[id];

    bot.sendMessage(
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

  });

};