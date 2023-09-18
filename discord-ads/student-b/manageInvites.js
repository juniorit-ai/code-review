const axios = require('axios');
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
const cron = require('node-cron');

// Connect to your Strapi database
mongoose.connect('mongodb+srv://padmagovind:Hema123@cluster1.9qe477e.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define your Strapi model (replace with your actual model)
const DiscordInvite = require('C:/Users/MINAT/Documents/DiscordBot/discord-invite-project/api/invite/models/invite.js');

// Initialize Discord.js bot
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Discord Bot Token
const DISCORD_BOT_TOKEN = 'MTE0OTU1OTYyNjcwMzA2NTEyNQ.GmSa-W.oP8CzwarNb0lGBxNOjOOoYpgtLGSRTORe8Q4Js';

bot.once('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
  startScheduledTasks();
});

bot.login(DISCORD_BOT_TOKEN);

async function startScheduledTasks() {
  // Schedule a task to periodically check and update Discord invitation links
  cron.schedule('0 0 * * *', () => {
    checkAndUpdateInvites();
  });
}

async function checkAndUpdateInvites() {
  try {
    // Fetch unused invitation links from the database
    const unusedInvites = await DiscordInvite.find({ status: 'unused' }).limit(20);

    for (const invite of unusedInvites) {
      // Flag the link as 'invited' in the database
      invite.status = 'invited';
      await invite.save();

      // Create an additional invitation link using Discord API
      const guild = await bot.guilds.fetch('730814833448189972'); // Replace with your server ID
      const newInvite = await guild.channels.cache
        .filter((channel) => channel.type === 'GUILD_TEXT')
        .first()
        .createInvite();

      // Store the new invite link in the database
      const newDiscordInvite = new DiscordInvite({
        link: newInvite.url,
        status: 'unused',
      });
      await newDiscordInvite.save();
    }

    console.log('Invitation links updated.');
  } catch (error) {
    console.error(error);
  }
}

// Add an event listener for when a user joins your server
bot.on('guildMemberAdd', (member) => {
  // Update the link status to 'used' in the database
  DiscordInvite.findOneAndUpdate({ link: member.guild.splash }, { status: 'used' }, (err) => {
    if (err) {
      console.error(err);
    } else {
      // Invoke the adsConversion function with the current date and time
      adsConversion(new Date());
    }
  });
});

// Mockup adsConversion function
function adsConversion(dateTime) {
  console.log(`User joined at ${dateTime}. Conversion tracked.`);
}

