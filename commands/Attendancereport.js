const isAdmin = require("../utils/isadmin");
const attendance = require("../utils/attendance");

module.exports = function (bot) {
  // /report -> sabki total (all-time) stats
  bot.onText(/^\/report$/, (msg) => {
    const chatId = msg.chat.id;
    if (!isAdmin(msg.from.id)) {
      return bot.sendMessage(chatId, "❌ Sirf admin ke liye.");
    }

    const stats = attendance.getAllStats();
    const ids = Object.keys(stats);

    if (ids.length === 0) {
      return bot.sendMessage(chatId, "Abhi tak koi record nahi hai.");
    }

    let text = "📊 Sabki Total Attendance:\n\n";
    ids.forEach((id) => {
      const s = stats[id];
      text += `${s.name}: ✅ ${s.present}  ❌ ${s.absent}\n`;
    });

    bot.sendMessage(chatId, text);
  });

  // /report 2026-08-14 -> ek specific date ka full record
  bot.onText(/^\/report (\d{4}-\d{2}-\d{2})$/, (msg, match) => {
    const chatId = msg.chat.id;
    if (!isAdmin(msg.from.id)) {
      return bot.sendMessage(chatId, "❌ Sirf admin ke liye.");
    }

    const date = match[1];
    const rec = attendance.getRecordForDate(date);
    const members = attendance.getAllMembers();

    if (rec.holiday) {
      return bot.sendMessage(
        chatId,
        `🎉 ${date} ko Holiday thi.\nReason: ${rec.reason || "N/A"}`
      );
    }

    const present = [];
    const absent = [];
    const notMarked = [];

    for (const id in members) {
      const mark = rec.marks[id];
      if (mark === "present") present.push(members[id].name);
      else if (mark === "absent") absent.push(members[id].name);
      else notMarked.push(members[id].name);
    }

    let text = `📅 Report for ${date}:\n\n`;
    text += `✅ Present (${present.length}): ${present.join(", ") || "—"}\n\n`;
    text += `❌ Absent (${absent.length}): ${absent.join(", ") || "—"}\n\n`;
    text += `⚪ Not Marked (${notMarked.length}): ${notMarked.join(", ") || "—"}`;

    bot.sendMessage(chatId, text);
  });
};
