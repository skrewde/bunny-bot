const { EmbedBuilder } = require('discord.js'); // Import EmbedBuilder

module.exports = {
    data: {
        name: 'setup', // Name of the command
    },
    description: 'Sets up reaction roles', // Optional command description

    async execute(message, client) {
        const roleEmbedMapping = [
            {
                title: " ",
                description: "React to get your color role!",
                color: "#0000FF", // Change to hex code for blue
                roles: {
                    '🔴': 'ROLE_ID_FOR_RED',   // Replace with actual role IDs
                    '🟢': 'ROLE_ID_FOR_GREEN',
                    '🔵': 'ROLE_ID_FOR_BLUE'
                }
            },
            {
                title: "Game Roles",
                description: "React to get your game role!",
                color: "#008000", // Change to hex code for green
                roles: {
                    '🎮': 'ROLE_ID_FOR_GAMER',
                    '⚔️': 'ROLE_ID_FOR_WARRIOR',
                    '🏹': 'ROLE_ID_FOR_ARCHER'
                }
            }
        ];

        // Loop through each embed data to create the messages
        for (const embedData of roleEmbedMapping) {
            const embed = new EmbedBuilder()
                .setTitle(embedData.title)
                .setDescription(embedData.description)
                .setColor(embedData.color); // Set the color as a hex code

            // Add each role to the embed as a field
            for (const [emoji, roleId] of Object.entries(embedData.roles)) {
                const role = message.guild.roles.cache.get(roleId);
                if (role) {
                    embed.addFields({ name: emoji, value: role.name, inline: true });
                }
            }

            // Send the embed message
            const embedMessage = await message.channel.send({ embeds: [embed] });

            // React to the message with each emoji
            for (const emoji of Object.keys(embedData.roles)) {
                await embedMessage.react(emoji);
            }
        }
    }
};
