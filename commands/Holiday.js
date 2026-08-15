const isAdmin = require("../utils/isadmin");
const attendance = require("../utils/attendance");

module.exports = function (bot) {
  bot.onText(/^\/holiday(?:\s+(.+))?$/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!isAdmin(userId)) {
      return bot.sendMessage(chatId, "❌ Sirf admin hi holiday mark kar sakte hain.");
    }

    const reason = match[1] || "Holiday";
    const date = attendance.markHoliday(reason);

    bot.sendMessage(
      chatId,
      `🎉 ${date} ko HOLIDAY mark kar diya gaya hai.\nReason: ${reason}`
    );
  });
};
