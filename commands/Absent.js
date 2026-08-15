const attendance = require("../utils/attendance");

module.exports = function (bot) {
  bot.onText(/^\/absent$/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const name =
      msg.from.first_name + (msg.from.last_name ? " " + msg.from.last_name : "");

    if (attendance.isHolidayToday()) {
      return bot.sendMessage(
        chatId,
        "🎉 Aaj holiday hai, attendance lagane ki zarurat nahi!"
      );
    }

    const result = attendance.markAttendance(userId, "absent");
    if (result.ok) {
      bot.sendMessage(
        chatId,
        `❌ ${name}, aapki attendance ABSENT lag gayi (${result.date})`
      );
    }
  });
};
