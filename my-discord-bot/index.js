require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.content === "!TATER") {
    message.reply(`AH! Please don't byte me`);
  }
  if (message.content === "Good morning") {
    message.reply(`Sir Fredrick the Tato bids thee good morning 🥔`);
  }
  if (message.content === "Good night") {
    message.reply(`Sir Fredrick the Tato bids thee goodnight 🥔`);
  }
  if (message.content === "EDS") {
    message.reply(
      `The Ehlers-Danlos syndromes (EDS) are a group of 13 heritable connective tissue disorders. The conditions are caused by genetic changes that affect connective tissue. Each type of EDS has its own set of features with distinct diagnostic criteria. Some features are seen across all types of EDS, including joint hypermobility, skin hyperextensibility, and tissue fragility. `
    );
  }
});

client.login(process.env.TOKEN);
