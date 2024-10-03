const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Sets up reaction roles'),

    async execute(interaction) {
        // Acknowledge the interaction with a deferred response
        await interaction.deferReply({ ephemeral: true });

        const roleEmbedMapping = [
            {
                title: "Color Roles",
                description: "React to get your color role!",
                color: 0x0000FF, // Use hexadecimal color codes
                roles: {
                    '🔴': 'ROLE_ID_FOR_RED', // Replace with actual role IDs
                    '🟢': 'ROLE_ID_FOR_GREEN',
                    '🔵': 'ROLE_ID_FOR_BLUE'
                }
            },
            {
                title: " 「 ✦ pronouns ✦ 」 ",
                description: "react to get your role!",
                color: 0x00FF00, // Use hexadecimal color codes
                roles: {
                    '🎮': '1291264164907454485',
                    '⚔️': 'ROLE_ID_FOR_WARRIOR',
                    '🏹': 'ROLE_ID_FOR_ARCHER'
                }
            }
        ];

        // Send an initial response to inform the user
        await interaction.editReply({ content: 'Setting up your roles...', ephemeral: true });

        // Loop through each embed data
        for (const embedData of roleEmbedMapping) {
            const embed = {
                title: embedData.title,
                description: embedData.description,
                color: embedData.color,
                fields: [], // Initialize fields array for embeds
            };

            // Loop through the roles and add fields
            for (const [emoji, roleId] of Object.entries(embedData.roles)) {
                const role = interaction.guild.roles.cache.get(roleId);
                if (role) {
                    embed.fields.push({ name: emoji, value: role.name, inline: true });
                }
            }

            // Send the embed message and add reactions
            const embedMessage = await interaction.channel.send({ embeds: [embed] });
            for (const emoji of Object.keys(embedData.roles)) {
                await embedMessage.react(emoji);
            }
        }

        // Edit the initial response to indicate completion
        await interaction.editReply({ content: 'Your roles have been set up!', ephemeral: true });
    }
};
