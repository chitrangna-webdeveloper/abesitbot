const { users, saveUsers } = require("../utils/database");
const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

  const tasks = [
    "Build a Responsive Login Page using HTML & CSS.",
    "Create a Personal Portfolio Homepage.",
    "Build a Calculator using JavaScript.",
    "Make a Netflix Landing Page Clone.",
    "Create a To-Do List App.",
    "Build a Weather App using JavaScript.",
    "Design a Product Card using Flexbox.",
    "Create a Responsive Navigation Bar."
  ];

  bot.onText(/\/task/, async (msg) => {

    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];

    const sent = await bot.sendMessage(
      msg.chat.id,
`🚀 *Today's Coding Challenge*

📚 *Task:*
${randomTask}

⏰ Deadline: Today 11:59 PM

📸 Submit your GitHub link in the group.

🔥 Happy Coding!`,
      {
        parse_mode: "Markdown",
      }
    );

    // Auto delete bot reply and user's command
    autoDelete(bot, msg.chat.id, sent.message_id);
    autoDelete(bot, msg.chat.id, msg.message_id);

  });

};