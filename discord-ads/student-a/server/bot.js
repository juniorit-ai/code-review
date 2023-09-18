require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const BOT_TOKEN = process.env.BOT_TOKEN;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  console.log(`${member.user.tag} joined the server.`);


  try {
    // Access the invite property to get information about the invite link used
    const invite = await member.guild.fetchInvites();
    const usedInvite = invite.find((inv) => inv.uses > 0);

    if (usedInvite) {
      const invitationLink = usedInvite.url;
      const invitationCode = usedInvite.code;

      // Update the 'isUsed' field in the database to 'true' for the specific code
      await markInvitationLinkAsUsed(invitationCode);

      console.log(`Marked invitation link as used for user ${member.user.tag}`);
    }
  } catch (error) {
    console.error(`Error marking invitation link as used: ${error.message}`);
  }

  // Call your function to track the conversion with the timestamp
  // adsConversion(new Date());
});

async function markInvitationLinkAsUsed(invitationCode) {
  const API_BASE_URL = 'http://localhost:1337'; // Change this to your Strapi API URL

  try {
    await axios.put(`${API_BASE_URL}/invitation/update`, {
      data: {
        code: invitationCode,
        used: true,
      },
    });
  } catch (error) {
    throw new Error(`Error marking invitation link as used: ${error.message}`);
  }
}


client.login(BOT_TOKEN);
