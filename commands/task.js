const { users, saveUsers } = require("../utils/database");

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

  bot.onText(/\/task/, (msg) => {

    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];

    bot.sendMessage(
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

  });

};