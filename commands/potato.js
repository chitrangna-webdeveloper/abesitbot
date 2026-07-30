
const games = new Map();

module.exports = (bot) => {

    // ==========================
    // START GAME
    // ==========================
    bot.onText(/\/potato/, async (msg) => {

        const chatId = msg.chat.id;

        if (msg.chat.type === "private") {
            return bot.sendMessage(chatId, "❌ Play this game in a group.");
        }

        if (games.has(chatId)) {
            return bot.sendMessage(chatId, "⚠️ A Hot Potato game is already running.");
        }

        games.set(chatId, {
            host: msg.from.id,
            started: false,
            players: [],
            messageId: null,
            holder: null,
            timer: null
        });

        const sent = await bot.sendMessage(
            chatId,
            `🥔 *HOT POTATO*\n\nPlayers Joined: *0*\n\nClick Join to play!`,
            {
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "🎮 Join",
                                callback_data: "potato_join"
                            },
                            {
                                text: "❌ Leave",
                                callback_data: "potato_leave"
                            }
                        ],
                        [
                            {
                                text: "▶️ Start",
                                callback_data: "potato_start"
                            }
                        ]
                    ]
                }
            }
        );

        games.get(chatId).messageId = sent.message_id;

    });

    // ==========================
    // BUTTONS
    // ==========================
    bot.on("callback_query", async (query) => {

        const chatId = query.message.chat.id;
        const game = games.get(chatId);

        if (!game) return;

        // ==================
        // JOIN
        // ==================
        if (query.data === "potato_join") {

            if (game.started) {
                return bot.answerCallbackQuery(query.id, {
                    text: "Game already started!"
                });
            }

            if (game.players.find(p => p.id === query.from.id)) {

                return bot.answerCallbackQuery(query.id, {
                    text: "Already joined!"
                });

            }

            game.players.push({
                id: query.from.id,
                name: query.from.first_name,
                username: query.from.username || query.from.first_name
            });

            updateLobby(bot, chatId, game);

            return bot.answerCallbackQuery(query.id, {
                text: "Joined!"
            });

        }

        // ==================
        // LEAVE
        // ==================
        if (query.data === "potato_leave") {

            if (game.started) {
                return bot.answerCallbackQuery(query.id, {
                    text: "Game already started!"
                });
            }

            game.players = game.players.filter(
                p => p.id !== query.from.id
            );

            updateLobby(bot, chatId, game);

            return bot.answerCallbackQuery(query.id, {
                text: "Left game!"
            });

        }

        // ==================
        // START
        // ==================
        if (query.data === "potato_start") {

            if (query.from.id !== game.host) {

                return bot.answerCallbackQuery(query.id, {
                    text: "Only host can start!"
                });

            }

            if (game.players.length < 3) {

                return bot.answerCallbackQuery(query.id, {
                    text: "Minimum 3 players required."
                });

            }

            game.started = true;

            bot.editMessageText(

`🔥 *HOT POTATO STARTED!*

Players: ${game.players.length}

🥔 Choosing first holder...`,

                {
                    chat_id: chatId,
                    message_id: game.messageId,
                    parse_mode: "Markdown"
                }

            );

            bot.answerCallbackQuery(query.id);

            // Next Part
            startGame(bot, chatId);

        }

    });

};


// ==========================
// UPDATE LOBBY
// ==========================
function updateLobby(bot, chatId, game) {

    const list = game.players.length
        ? game.players.map((p, i) =>
            `${i + 1}. ${p.name}`
        ).join("\n")
        : "No players yet.";

    bot.editMessageText(

`🥔 *HOT POTATO*

Players Joined: *${game.players.length}*

${list}`,

        {
            chat_id: chatId,
            message_id: game.messageId,
            parse_mode: "Markdown",
            reply_markup: {

                inline_keyboard: [

                    [
                        {
                            text: "🎮 Join",
                            callback_data: "potato_join"
                        },
                        {
                            text: "❌ Leave",
                            callback_data: "potato_leave"
                        }
                    ],

                    [
                        {
                            text: "▶️ Start",
                            callback_data: "potato_start"
                        }
                    ]

                ]

            }

        }

    );

}



// ==========================
// PART 2 WILL START HERE
// ==========================
function startGame(bot, chatId){

}
// ==========================
// START GAME
// ==========================
function startGame(bot, chatId) {

    const game = games.get(chatId);
    if (!game) return;

    // Random first holder
    game.currentIndex = Math.floor(Math.random() * game.players.length);

    bot.sendMessage(
        chatId,
        `🥔 Potato is with *${game.players[game.currentIndex].name}*`,
        {
            parse_mode: "Markdown"
        }
    );

    // Random blast time (20-40 sec)
    game.blastTime = Date.now() + (Math.floor(Math.random() * 21) + 20) * 1000;

    // Start passing
    passPotato(bot, chatId);
}



// ==========================
// AUTO PASS
// ==========================
function passPotato(bot, chatId) {

    const game = games.get(chatId);
    if (!game) return;

    // Winner
    if (game.players.length === 1) {

        bot.sendMessage(
            chatId,
            `🏆 *${game.players[0].name}* wins Hot Potato! 🎉`,
            {
                parse_mode: "Markdown"
            }
        );

        clearTimeout(game.timer);
        games.delete(chatId);
        return;
    }

    // Blast check
    if (Date.now() >= game.blastTime) {
        return explode(bot, chatId);
    }

    // Next player
    game.currentIndex++;

    if (game.currentIndex >= game.players.length) {
        game.currentIndex = 0;
    }

    const current = game.players[game.currentIndex];

    bot.sendMessage(
        chatId,
        `🥔 Potato passed to *${current.name}*`,
        {
            parse_mode: "Markdown"
        }
    );

    // Random pass speed (2-4 sec)
    const delay = Math.floor(Math.random() * 3 + 2) * 1000;

    game.timer = setTimeout(() => {
        passPotato(bot, chatId);
    }, delay);

}



// ==========================
// PART 3
// ==========================
function explode(bot, chatId){

}
// ==========================
// EXPLOSION
// ==========================
function explode(bot, chatId) {

    const game = games.get(chatId);
    if (!game) return;

    clearTimeout(game.timer);

    const eliminated = game.players[game.currentIndex];

    bot.sendMessage(
        chatId,
        `💥 BOOM!!\n\n🥔 Potato exploded in *${eliminated.name}'s* hands!\n\n❌ ${eliminated.name} is eliminated.`,
        {
            parse_mode: "Markdown"
        }
    );

    // Remove eliminated player
    game.players.splice(game.currentIndex, 1);

    // Winner
    if (game.players.length === 1) {

        bot.sendMessage(
            chatId,
            `🏆 *${game.players[0].name}* wins the Hot Potato game! 🎉`,
            {
                parse_mode: "Markdown"
            }
        );

        games.delete(chatId);
        return;
    }

    // Adjust index after removal
    if (game.currentIndex >= game.players.length) {
        game.currentIndex = 0;
    }

    // Next round after 3 sec
    setTimeout(() => {

        bot.sendMessage(
            chatId,
            `🔄 Next Round!\n\n🥔 Potato starts with *${game.players[game.currentIndex].name}*`,
            {
                parse_mode: "Markdown"
            }
        );

        // New random blast time (20–40 sec)
        game.blastTime = Date.now() + (Math.floor(Math.random() * 21) + 20) * 1000;

        passPotato(bot, chatId);

    }, 3000);

}
