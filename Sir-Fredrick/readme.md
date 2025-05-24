Sir fredrick the Tater

Code broken down and explained:

Load enviroment variables

```
require('dontenv').config
- Loads variables from a .env file, like your bot's secret token,
- This keeps sensitive information (like TOKEN) out of my code.

Import required modules
~~~~~~~~~~~~~~~~~~~~~~~
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
- discord.js is the library used to interact with discord.
- fs is a File system module, lets you read and write files (used for saving user activity).

Setup constants
~~~~~~~~~~~~~~~~
const LAST_SEEN_FILE = "./Lastseen.json";
const INACTIVITY_THRESHOLD = 7 * 24 * 60 * 60 * 1000; //1 week in milliseconds
- LAST_SEEN_FILE File path to store last seen times.
- INACTIVITY_THRESHOLD 1 week in milliseconds; if someone returns after this, they get a welcome back message.


Discord bot client
~~~~~~~~~~~~~~~~~~
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Message Content,
    ],
});
- Creates the bot with specific intents, which are permissions the bot uses to read messages and respond
    -Guilds: Needed for basic server events
    -GuildMessages: Needed to recieve message events
    -GuildContent: Neede to read message content.


```
