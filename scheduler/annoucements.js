const cron = require("node-cron");

const announcements = [
`🌞 *Good Morning, ABESIT Coders!*

📌 *Today's Mission*

🟢 Easy: Solve 1 Array Problem
🟡 Medium: Build a Calculator
🔴 Hard: Solve 1 LeetCode Medium

✅ Complete your task and use /done

Keep learning. Keep growing. 🚀`,

`💡 *Coding Tip of the Day*

Always prefer *===* instead of *==* in JavaScript to avoid unexpected type coercion.

Happy Coding! 💻`,

`🔥 *Daily Motivation*

Small progress every day leads to big success.

Don't break your coding streak today! 💯`,

`📚 *Revision Reminder*

Revise:
• Arrays
• Objects
• Functions
• ES6 Features

Consistency beats talent. 🚀`
];

module.exports = (bot) => {

    const GROUP_ID = process.env.GROUP_ID;

    // Every day at 8:00 AM
    cron.schedule("0 8 * * *", async () => {

        try {

            const message =
                announcements[Math.floor(Math.random() * announcements.length)];

            const sent = await bot.sendMessage(
                GROUP_ID,
                message,
                {
                    parse_mode: "Markdown"
                }
            );

            console.log("✅ Daily announcement sent.");

            // Auto delete after 1 hour
            setTimeout(async () => {
                try {
                    await bot.deleteMessage(GROUP_ID, sent.message_id);
                    console.log("🗑 Announcement deleted.");
                } catch (err) {
                    console.log("Delete Error:", err.message);
                }
            }, 60 * 60 * 1000);

        } catch (err) {
            console.log("Announcement Error:", err.message);
        }

    }, {
        timezone: "Asia/Kolkata"
    });

};