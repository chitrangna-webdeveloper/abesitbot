module.exports = (bot) => {

  bot.on("new_chat_members", (msg) => {

    msg.new_chat_members.forEach((member) => {

      const name = member.first_name;

      bot.sendMessage(
        msg.chat.id,

`🎉 Welcome to ABESIT Buddy, ${name}! 🚀

👋 Thank you for joining our coding community.

💻 Here we learn, build projects, solve challenges and grow together.

🌱 Wishing you an amazing journey ahead filled with:
✨ Learning
🚀 Innovation
🔥 Consistency
🏆 Success

Feel free to explore and participate in daily coding challenges.

📌 Commands:
💻 /task - Get today's coding challenge
✅ /done - Complete your challenge
📊 /progress - Check your progress

Happy Coding ${name}! 🤖🔥`

      );

    });

  });

};