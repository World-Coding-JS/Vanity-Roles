const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences, 
    ]
});


// Config
const GUILD_ID = '<GUILD ID>'; // ID guild servers
const ROLE_ID = '<ROLE ID>'; // Role ID "supporter"
const LOG_CHANNEL_ID = 'LOGS CHANNEL ID'; // ID of the log channel
const TRIGGER_STATUSES = "/worldcoding"; // List of statuses that add to the roll

// Tracks users to prevent duplicates
const processedUsers = new Set();

client.on('ready', () => {
    console.log(`The bot is launched as ${client.user.tag}`);
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    if (!newPresence || !newPresence.activities || newPresence.activities.length === 0) return;

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) return;

    const user = guild.members.cache.get(newPresence.userId) || await guild.members.fetch(newPresence.userId).catch(() => null);
    if (!user) return;

    const logChannel = guild.channels.cache.get(LOG_CHANNEL_ID);
    if (!logChannel) return console.error('Log channel not found.');

    // Checks if the user has any of the required statuses
    const hasTriggerStatus = newPresence.activities.some(activity => 
        activity.state && TRIGGER_STATUSES.some(status => activity.state.includes(status))
    );

    if (hasTriggerStatus && !processedUsers.has(user.id)) {
        processedUsers.add(user.id);

        if (!user.roles.cache.has(ROLE_ID)) {
            await user.roles.add(ROLE_ID, 'The user posted a status with /divine or /divinee');
            console.log(`Role assigned to user ${user.user.tag}`);

            const embed = new EmbedBuilder()
                .setColor('#03fcf8')
                .setTitle('World Coding - Support Roles')
                .setDescription(`> **<@${user.id}> has set the status "/worldcoding" and received the role of supporter**.`)
                .setThumbnail(guild.iconURL({ dynamic: true, size: 2048 }))
                .setTimestamp()
                .setFooter({ text: 'Powered By World Coding', iconURL: client.user.displayAvatarURL() });

            await logChannel.send({ embeds: [embed] });
        }
    } else if (!hasTriggerStatus && processedUsers.has(user.id)) {
        processedUsers.delete(user.id);

        if (user.roles.cache.has(ROLE_ID)) {
            await user.roles.remove(ROLE_ID, 'User removed status from /worldcoding');
            console.log(`Role removed from user ${user.user.tag}`);

            const embed = new EmbedBuilder()
                .setColor('#03fcf8')
                .setTitle('World Coding - Support Roles')
                .setDescription(`> **<@${user.id}> has removed the "/wolrdcoding" status and is no longer a role supporter**.`)
                .setThumbnail(guild.iconURL({ dynamic: true, size: 2048 }))
                .setTimestamp()
                .setFooter({ text: 'Powered by World Coding', iconURL: client.user.displayAvatarURL() });

            await logChannel.send({ embeds: [embed] });
        }
    }
});


client.login(`TOKEN BOT`);


// Bot Developer: jovanje
// Github: World-Coding-JS
// Discord servers: https://discord.gg/VNBVhWunav
// You have free source bots on our discord server and you have paid premium and shop!
// Discord.js Version : 14
// Run bot on terminal: node index.js