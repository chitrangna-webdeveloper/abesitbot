console.log("🚀 VERSION TEST 999");
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
});

require("dotenv").config();

const { TelegramBot } = require("node-telegram-bot-api");

// Check BOT_TOKEN
if (!process.env.BOT_TOKEN) {
  console.error("❌ BOT_TOKEN not found! Check Railway Variables.");
  process.exit(1);
}
const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

console.log("🤖 Bot Running...");

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

// Events
require("./events/newMember")(bot);
require("./events/message")(bot);

// Scheduler
require("./scheduler/annoucements")(bot);

// Temporary Command
bot.onText(/\/id/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `🆔 Your Telegram ID is: ${msg.from.id}`
  );
});
