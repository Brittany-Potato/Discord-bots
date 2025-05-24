//!~~~~~~~~~~Imports and Variables~~~~~~~~~~~~~
require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const LAST_SEEN_FILE = "./lastseen.json";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let data = {};
const userMessageData = new Map(); // 🛠️ Moved outside to persist between messages

//! ~~~~~~~~~~Welcome back message~~~~~~~~~~~~~
const INACTIVITY_THRESHOLD = 7 * 24 * 60 * 60 * 1000; // 1 week in ms

if (fs.existsSync(LAST_SEEN_FILE)) {
  data = JSON.parse(fs.readFileSync(LAST_SEEN_FILE, "utf8"));
}

const lastSeenMap = new Map(Object.entries(data)); // Store last seen timestamps per user (by ID)

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const userID = message.author.id;
  const now = Date.now();
  const lastSeen = lastSeenMap.get(userID);

  //!~~~~~~~~~~~~~~~~~Message Rate Tracking~~~~~~~~~~~~~~~~~~
  const targetCount = 5;

  function getRandomWindow() {
    return 30_000 + Math.floor(Math.random() * 60_000); // 30–90 seconds
  }

  let userData = userMessageData.get(userID);
  if (!userData || now - userData.start > userData.window) {
    userData = { count: 1, start: now, window: getRandomWindow() };
  } else {
    userData.count++;
  }

  if (userData.count === targetCount) {
    const potatoWarnings = [
      "Steady on, you overcooked hashbrown 🥔",
      "You're more mashed than a Sunday dinner!",
      "Even a baked potato knows when to cool down.",
      "You're talking more than a boiling pot of stew!",
      "Careful, you're gonna sprout something with all that chatter!",
      "Sir Fredrick suggests a moment of starchful silence.",
      "You chat like a potato rolling downhill — no brakes!",
      "You're crispier than a forgotten fry under the seat.",
      "The couch isn’t the only thing you're overusing today.",
      "You're making the other taters look quiet!",
      "You're peeling away everyone’s attention!",
      "Easy, chatter-spud, the fryer’s not even on!",
      "You talk more than a tater in a microwave with no door!",
      "Someone pass the butter, this one’s getting salty.",
      "Sir Fredrick believes you may be... over-tatered.",
    ];

    const randomIndex = Math.floor(Math.random() * potatoWarnings.length);
    const chosenMessage = potatoWarnings[randomIndex];

    message.reply(chosenMessage);

    userData.count = 0;
    userData.start = now;
    userData.window = getRandomWindow();
  }

  userMessageData.set(userID, userData);

  //!~~~~~~~~~~Welcome back if inactive~~~~~~~~~~~~~
  if (lastSeen && now - lastSeen > INACTIVITY_THRESHOLD) {
    message.reply(
      `Sir Fredrick the Tater welcomes you back, ${message.author.username}! Your fellow spuds have missed you! 🥔`
    );
  }

  // 🕒 Update last seen time
  lastSeenMap.set(userID, now);
  fs.writeFileSync(
    LAST_SEEN_FILE,
    JSON.stringify(Object.fromEntries(lastSeenMap), null, 2)
  );

  //!~~~~~~~~~~Response messages~~~~~~~~~~~~~
  if (message.content === "!TATER") {
    const responses = [
      "Sir Fredrick the Tater demands a nap... preferably in butter.",
      "A rolling tater gathers no fries.",
      "One does not simply mash into Mordor.",
      "I’m not a snack. I’m the whole sack!",
      "I survived the Great Famine and all I got was this lousy Discord role.",
      "Peel me once, shame on you. Peel me twice? I’m hashbrowns.",
      "If you fry me, I shall become more powerful than you can possibly imagine.",
      "I was knighted for bravery in the Battle of the Fryer.",
      "The starch is strong with this one.",
      "My eyes may sprout, but I never blink.",
      "A boiled tater is still a noble tater.",
      "Sir Spudrick was my father. Call me Fred.",
      "I trained under Master Russet in the arts of couch-sitting.",
      "Don’t butter me up unless you mean it.",
      "I may be tuber-lent, but I’m full of love.",
      `AH! Please don't byte me`,
      "Ouch! That tickles my circuits 🥔",
      "Sir Fredrick the Tato is alarmed!",
      "You dare summon the TATER?!",
      "I’m just a humble potato bot, please be gentle!",
    ];

    const randomIndex = Math.floor(Math.random() * responses.length);
    const randomResponse = responses[randomIndex];

    message.reply(randomResponse);
  }

  if (message.content.toLowerCase() === "good morning") {
    message.reply(`Sir Fredrick the Tato bids thee good morning 🥔`);
  }

  if (message.content.toLowerCase() === "good night") {
    message.reply(`Sir Fredrick the Tato bids thee goodnight 🥔`);
  }

  if (message.content.toLowerCase() === "fuck") {
    message.reply(`exCUse YOU CHILD`);
  }

  if (message.content === "EDS") {
    message.reply(
      `The Ehlers-Danlos syndromes (EDS) are a group of 13 heritable connective tissue disorders. The conditions are caused by genetic changes that affect connective tissue. Each type of EDS has its own set of features with distinct diagnostic criteria. Some features are seen across all types of EDS, including joint hypermobility, skin hyperextensibility, and tissue fragility.`
    );
  }

  if (message.content.toLowerCase().includes("hurr")) {
    message.channel.send({
      content: "*Hrmm...* 👀", // 🛠️ Fixed typo here
      files: ["./images/villager.jpg"],
    });
  }
});

client.login(process.env.TOKEN);
