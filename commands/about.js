const path = require("path");

module.exports = (bot) => {

  bot.onText(/\/about/, (msg) => {

    const photo = path.join(__dirname, "../assets/abesit.jpg");

    bot.sendPhoto(msg.chat.id, photo, {
      caption: `🏫 *About ABESIT*

✨ *ABES Institute of Technology (ABESIT), Ghaziabad* is a premier engineering institute dedicated to innovation, excellence, and career-focused education.

🎓 *Highlights:*
🚀 Industry-oriented curriculum
💻 Modern computer labs
👨‍🏫 Experienced faculty
🏆 Coding culture & hackathons
💼 Excellent placement support
📚 Smart classrooms & digital library
🌱 Student clubs & technical events

🤖 *ABESIT Buddy* is your coding companion, helping you stay consistent through daily tasks, XP, leaderboards, challenges, and much more.

💙 *Learn • Code • Build • Grow*`,
      parse_mode: "Markdown"
    });

  });

};