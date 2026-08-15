const attendance = require("../utils/attendance");

module.exports = function (bot) {
  bot.onText(/^\/present$/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const name =
      msg.from.first_name + (msg.from.last_name ? " " + msg.from.last_name : "");

    attendance.registerMember(userId, name, msg.from.username);

    if (attendance.isHolidayToday()) {
      return bot.sendMessage(
        chatId,
        "🎉 Aaj holiday hai, attendance lagane ki zarurat nahi!"
      );
    }

    const result = attendance.markAttendance(userId, "present");
    if (result.ok) {
      bot.sendMessage(
        chatId,
        `✅ ${name}, aapki attendance PRESENT lag gayi (${result.date})`
      );
    }
  });
};
