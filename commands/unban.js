const isAdmin = require("../utils/isAdmin");

module.exports = (bot) => {

    bot.onText(/\/unban (\d+)/, async (msg, match) => {

        if (!isAdmin(msg.from.id)) {
            return bot.sendMessage(
                msg.chat.id,
                "❌ Only Owner/Admins can use this command."
            );
        }

        const userId = Number(match[1]);

        try {
            await bot.unbanChatMember(msg.chat.id, userId);

            bot.sendMessage(
                msg.chat.id,
                `✅ User \`${userId}\` has been unbanned.`,
                { parse_mode: "Markdown" }
            );

        } catch (err) {
            console.log(err);
            bot.sendMessage(
                msg.chat.id,
                "❌ Failed to unban the user."
            );
        }

    });

};