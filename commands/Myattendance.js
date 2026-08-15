const attendance = require("../utils/attendance");

module.exports = function (bot) {
  bot.onText(/^\/myattendance$/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const stats = attendance.getUserStats(userId);

    bot.sendMessage(
      chatId,
      `📊 Aapki Attendance Report:\n\n` +
        `✅ Present: ${stats.present} din\n` +
        `❌ Absent: ${stats.absent} din\n` +
        `🎉 Holidays: ${stats.holidays} din\n` +
        `📅 Total Marked Days: ${stats.totalMarked}`
    );
  });
};
