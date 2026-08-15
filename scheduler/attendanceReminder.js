const attendance = require("../utils/attendance");

module.exports = function (bot) {
  const GROUP_CHAT_ID = process.env.ATTENDANCE_GROUP_ID;

  if (!GROUP_CHAT_ID) {
    console.log(
      "⚠️ ATTENDANCE_GROUP_ID .env me nahi mila, attendance reminders OFF hain."
    );
    return;
  }

  async function sendReminder() {
    if (attendance.isHolidayToday()) return;

    const unmarked = attendance.getUnmarkedToday();
    if (unmarked.length === 0) return;

    const names = unmarked
      .map((u) => (u.username ? `@${u.username}` : u.name))
      .join(", ");

    try {
      await bot.sendMessage(
        GROUP_CHAT_ID,
        `⏰ Reminder: Inhone abhi tak aaj ki attendance nahi lagayi:\n\n${names}\n\nPlease /present ya /absent zaroor bhejein.`
      );
    } catch (err) {
      console.log("Attendance Reminder Error:", err.message);
    }
  }

  // Har 2 ghante check karega, lekin sirf 9 AM - 6 PM (IST) ke beech reminder bhejega
  setInterval(() => {
    const hour = parseInt(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        hour12: false,
      }),
      10
    );

    if (hour >= 9 && hour <= 18) {
      sendReminder();
    }
  }, 2 * 60 * 60 * 1000);
};
