const isAdmin = require("../utils/isAdmin");

module.exports = (bot) => {

    bot.onText(/\/ban/, async (msg) => {

        if (!isAdmin(msg.from.id)) {
            return bot.sendMessage(
                msg.chat.id,
                "❌ Only Owner/Admins can use this command."
            );
        }

        if (!msg.reply_to_message) {
            return bot.sendMessage(
                msg.chat.id,
                "⚠️ Reply to the user's message and then use /ban."
            );
        }

        const target = msg.reply_to_message.from;

        // Owner/Admin ko ban mat hone do
        if (isAdmin(target.id)) {
            return bot.sendMessage(
                msg.chat.id,
                "🛡️ You cannot ban an Owner or Admin."
            );
        }

        try {
            await bot.banChatMember(msg.chat.id, target.id);

            bot.sendMessage(
                msg.chat.id,
                `🚫 ${target.first_name} has been banned.`
            );

        } catch (err) {
            console.log(err);
            bot.sendMessage(
                msg.chat.id,
                "❌ I couldn't ban this user. Make sure I have the required permissions."
            );
        }

    });

};