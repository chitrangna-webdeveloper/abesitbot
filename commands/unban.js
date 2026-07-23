const isAdmin = require("../utils/isAdmin");
const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

    bot.onText(/\/unban (\d+)/, async (msg, match) => {

        if (!isAdmin(msg.from.id)) {
            const sent = await bot.sendMessage(
                msg.chat.id,
                "❌ Only Owner/Admins can use this command."
            );

            autoDelete(bot, msg.chat.id, sent.message_id);
            autoDelete(bot, msg.chat.id, msg.message_id);
            return;
        }

        const userId = Number(match[1]);

        try {
            await bot.unbanChatMember(msg.chat.id, userId);

            const sent = await bot.sendMessage(
                msg.chat.id,
                `✅ User \`${userId}\` has been unbanned.`,
                { parse_mode: "Markdown" }
            );

            autoDelete(bot, msg.chat.id, sent.message_id);
            autoDelete(bot, msg.chat.id, msg.message_id);

        } catch (err) {
            console.log(err);

            const sent = await bot.sendMessage(
                msg.chat.id,
                "❌ Failed to unban the user."
            );

            autoDelete(bot, msg.chat.id, sent.message_id);
            autoDelete(bot, msg.chat.id, msg.message_id);
        }

    });

};