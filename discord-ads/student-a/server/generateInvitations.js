require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

// Initialize your Discord bot with the appropriate intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

// Your bot token
const BOT_TOKEN = process.env.BOT_TOKEN;

// An array to store the generated invitation links
const guildId = "1149615918234751011";
const channelId = "1149615918918406217";
const invitationLinks = [];

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Get the guild object for the channel
  const guild = await client.guilds.cache.get(guildId);

  // Get the channel object
  const channel = await guild.channels.cache.get(channelId);

  // Generate 20 random numbers
  const randomNumbers = Array.from(Array(20), () =>
    Math.floor(Math.random() * 1000)
  );

  // Create 20 invitation links
  for (const randomNumber of randomNumbers) {
    const invite = await channel.createInvite({
      temporary: true,
      maxUses: 1,
      nonce: randomNumber,
      unique: true,
      customCode: randomNumber,
    });
    invitationLinks.push(invite.url);
  }

  // Print the invitation links
  console.log("Generated Invitation Links:");
  invitationLinks.forEach((link, index) => {
    console.log(`${index + 1}: ${link}`);
  });

  // Now, update the Strapi database with the generated invitation links
  for (const link of invitationLinks) {
    try {
      await saveInvitationLinkToDatabase(link);
      console.log(`Saved invitation link to the database: ${link}`);
    } catch (error) {
      console.error(
        `Error saving invitation link to the database: ${error.message}`
      );
    }
  }
});

async function saveInvitationLinkToDatabase(link) {
  const API_BASE_URL = "http://localhost:1337"; // Change this to your Strapi API URL

  try {
    await axios.post(`${API_BASE_URL}/invitation/create`, {
      data: {
        link,
        isUsed: false,
        isInvited: false
      },
    });
  } catch (error) {
    throw new Error(
      `Error saving invitation link to the database: ${error.message}`
    );
  }
}

client.login(BOT_TOKEN);
