console.log("🚀 VERSION TEST 999");

require("dotenv").config({ quiet: true });

// Handle promise rejections & exceptions
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
});

// Global Constants
const { TelegramBot } = require("node-telegram-bot-api");
const BOT_TOKEN = process.env.BOT_TOKEN;
const customApiUrl = (process.env.BOT_API_URL || "").trim();
const botOptions = { polling: true };

// Check BOT_TOKEN
if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN not found! Check Environment Variables.");
  process.exit(1);
}
// Check custom API URL
if (customApiUrl) {
  botOptions.baseApiUrl = customApiUrl;
  console.log("🧩 Using custom Telegram API URL:", customApiUrl);
}

// Initialize the bot
const bot = new TelegramBot(BOT_TOKEN, botOptions);
console.log("🤖 Bot Running...");

// Database
require("./utils/database");

// Commands
require("./commands/start")(bot);
require("./commands/help")(bot);
require("./commands/task")(bot);
require("./commands/done")(bot);
require("./commands/progress")(bot);
require("./commands/leaderboard")(bot);
require("./commands/active")(bot);
require("./commands/monthly")(bot);
require("./commands/joke")(bot);
require("./commands/about")(bot);
require("./commands/rank")(bot);
require("./commands/ban")(bot);
require("./commands/unban")(bot);
require("./commands/potato")(bot);

// Events
require("./events/newMember")(bot);
require("./events/message")(bot);

// Scheduler
require("./scheduler/announcements")(bot);
// Attendance Commands
require("./commands/Present")(bot);
require("./commands/Absent")(bot);
require("./commands/Holiday")(bot);
require("./commands/Myattendance")(bot);
require("./commands/attendancereport")(bot);

// Attendance Scheduler
require("./scheduler/attendanceReminder")(bot);
// Command Menu Setup
require("./setupCommands")(bot);

// Test Command (/id)
bot.onText(/\/id/, (msg) => {
  bot.sendMessage(msg.chat.id, `🆔 Your Telegram ID: ${msg.from.id}`);
});
