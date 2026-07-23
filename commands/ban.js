const isAdmin = require("../utils/isAdmin");
const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

    bot.onText(/\/ban/, async (msg) => {

        if (!isAdmin(msg.from.id)) {
            const sent = await bot.sendMessage(
                msg.chat.id,
                "❌ Only Owner/Admins can use this command."
            );

            autoDelete(bot, msg.chat.id, sent.message_id);
            autoDelete(bot, msg.chat.id, msg.message_id);
            return;
        }

        if (!msg.reply_to_message) {
            const sent = await bot.sendMessage(
                msg.chat.id,
                "⚠️ Reply to the user's message and then use /ban."
            );

            autoDelete(bot, msg.chat.id, sent.message_id);
            autoDelete(bot, msg.chat.id, msg.message_id);
            return;
        }

        const target = msg.reply_to_message.from;

        // Owner/Admin ko ban mat hone do
        if (isAdmin(target.id)) {
            const sent = await bot.sendMessage(
                msg.chat.id,
                "🛡️ You cannot ban an Owner or Admin."
            );

            autoDelete(bot, msg.chat.id, sent.message_id);
            autoDelete(bot, msg.chat.id, msg.message_id);
            return;
        }

        try {
            await bot.banChatMember(msg.chat.id, target.id);

            const sent = await bot.sendMessage(
                msg.chat.id,
                `🚫 ${target.first_name} has been banned.`
            );

            autoDelete(bot, msg.chat.id, sent.message_id);
            autoDelete(bot, msg.chat.id, msg.message_id);

        } catch (err) {
            console.log(err);

            const sent = await bot.sendMessage(
                msg.chat.id,
                "❌ I couldn't ban this user. Make sure I have the required permissions."
            );

            autoDelete(bot, msg.chat.id, sent.message_id);
            autoDelete(bot, msg.chat.id, msg.message_id);
        }

    });

};