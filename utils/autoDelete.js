module.exports = function autoDelete(bot, chatId, messageId, delay = 5000) {
    setTimeout(async () => {
        try {
            await bot.deleteMessage(chatId, messageId);
        } catch (err) {
            console.log("Auto Delete Error:", err.message);
        }
    }, delay);
};