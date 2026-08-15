module.exports = function setupCommands(bot) {
  bot.setMyCommands([
    { command: "start", description: "Bot start karo" },
    { command: "help", description: "Help dekho" },
    { command: "task", description: "Task dekho" },
    { command: "done", description: "Task complete karo" },
    { command: "progress", description: "Apna progress dekho" },
    { command: "leaderboard", description: "Leaderboard dekho" },
    { command: "active", description: "Active users dekho" },
    { command: "monthly", description: "Monthly stats dekho" },
    { command: "joke", description: "Ek joke suno" },
    { command: "about", description: "Bot ke baare me" },
    { command: "rank", description: "Apni rank dekho" },
    { command: "id", description: "Apni Telegram ID dekho" },

    // Attendance
    { command: "present", description: "Aaj present mark karo" },
    { command: "absent", description: "Aaj absent mark karo" },
    { command: "myattendance", description: "Apni attendance stats dekho" },
    { command: "holiday", description: "Aaj holiday mark karo (admin)" },
    { command: "report", description: "Attendance report dekho (admin)" },
  ]).then(() => {
    console.log("✅ Bot commands menu set ho gaya");
  }).catch((err) => {
    console.log("❌ setMyCommands error:", err.message);
  });
};
