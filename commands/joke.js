const jokes = [
  "{name}, coding itni mat karo ki keyboard bhi leave application de de. 😂",

  "{name}, tumhara Wi-Fi bhi sochta hoga, 'Ye banda phir aa gaya!' 🤣",

  "{name}, assignment submit karne se pehle Google bhi tumse permission maangta hai. 😆",

  "{name}, tumhare bugs bhi bolte hain, 'Hum permanent residents hain.' 🐞😂",

  "{name}, exam me tumhara confidence aur question paper ka relation long-distance wala hai. 🤭",

  "{name}, agar procrastination Olympic sport hota, to tum kal gold jeet lete. 🥇😂",

  "{name}, tumhare laptop ka fan tumse zyada mehnat karta hai. 😅",

  "{name}, tum itne busy ho ki alarm bhi snooze maangta hai. 😂",

  "{name}, tumhari coding dekhkar compiler bhi kehta hai 'Main chalta hoon.' 🤣",

  "{name}, chai aur coding ka combination dekhkar doctor bhi confuse ho gaya. ☕😂"
];

module.exports = (bot) => {

  bot.onText(/\/joke/, (msg) => {

    const name = msg.from.first_name;
    const joke = jokes[Math.floor(Math.random() * jokes.length)]
      .replace("{name}", name);

    bot.sendMessage(msg.chat.id, `😂 *Joke Time!*\n\n${joke}`, {
      parse_mode: "Markdown"
    });

  });

};