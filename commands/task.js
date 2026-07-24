const autoDelete = require("../utils/autoDelete");

module.exports = (bot) => {

  bot.onText(/\/task/, async (msg) => {

    const sent = await bot.sendMessage(
      msg.chat.id,
`📅 *Daily Coding Task*

━━━━━━━━━━━━━━━━━━━━━━
🐍 *Python (Basic → Strong Foundation)*
━━━━━━━━━━━━━━━━━━━━━━

📌 Variables
📌 Data Types
• int
• float
• str
• bool

📌 Input & Output
📌 Type Casting
• int()
• float()
• str()

📌 Operators
• Arithmetic
• Comparison
• Logical

📝 *Practice Programs*
✅ Calculator using Input
✅ Celsius → Fahrenheit Converter
✅ Age Calculator
✅ Even / Odd Checker
✅ Swap Two Numbers
   • With Third Variable
   • Without Third Variable

━━━━━━━━━━━━━━━━━━━━━━
🌐 *HTML*
━━━━━━━━━━━━━━━━━━━━━━

📌 Forms
📌 <input> Types
📌 <label>
📌 <textarea>
📌 <select>
📌 <option>
📌 <button>
📌 <fieldset>
📌 <legend>

💻 *Mini Project*

Create a *Student Registration Form* with:

• Name
• Email
• Phone
• Gender
• Branch
• Skills (Checkbox)
• Submit Button

━━━━━━━━━━━━━━━━━━━━━━
💻 *Operating System (Kernel Basics)*
━━━━━━━━━━━━━━━━━━━━━━

📌 What is an Operating System?
📌 What is a Kernel?

📌 Types of Kernel
• Monolithic
• Microkernel
• Hybrid
• Modular

📌 User Mode vs Kernel Mode
📌 System Calls

📌 Boot Process
BIOS / UEFI
   ↓
Bootloader
   ↓
Kernel
   ↓
Operating System

📌 Learn these Definitions
• Process
• Thread
• Program
• CPU Scheduler
• Interrupt
• Context Switching

━━━━━━━━━━━━━━━━━━━━━━
📚 *Homework*
━━━━━━━━━━━━━━━━━━━━━━

🐍 *Python*
Solve *10 programs* using Input/Output and Operators.

🌐 *HTML*
Build the Student Registration Form *without copying code.*

💻 *Operating System*
✍ Write *5–6 lines* explaining:
• What is a Kernel?

📊 Create a comparison table:
• Monolithic Kernel vs Microkernel

━━━━━━━━━━━━━━━━━━━━━━

🏆 Complete today's task and use */done* to earn your daily points ⭐

🚀 Happy Coding!`,
      {
        parse_mode: "Markdown",
      }
    );

    // Auto delete bot message and user's command
    autoDelete(bot, msg.chat.id, sent.message_id);
    autoDelete(bot, msg.chat.id, msg.message_id);

  });

};