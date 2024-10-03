const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Sets up reaction roles.'),
    
    async execute(interaction) {
        // Respond to the initial command
        await interaction.reply('Setting up your roles...');

        const roleEmbedMapping = [
            {
                title: "Color Roles",
                description: "React to get your color role!",
                color: 0x1E90FF, // Using a hex value instead of a string
                roles: {
                    '🔴': 'ROLE_ID_FOR_RED',   // Replace with actual role IDs
                    '🟢': 'ROLE_ID_FOR_GREEN',
                    '🔵': 'ROLE_ID_FOR_BLUE'
                }
            },
            {
                title: "Game Roles",
                description: "React to get your game role!",
                color: 0x32CD32, // Using a hex value instead of a string
                roles: {
                    '🎮': 'ROLE_ID_FOR_GAMER',
                    '⚔️': 'ROLE_ID_FOR_WARRIOR',
                    '🏹': 'ROLE_ID_FOR_ARCHER'
                }
            }
        ];

        for (const embedData of roleEmbedMapping) {
            const embed = new EmbedBuilder()
                .setTitle(embedData.title)
                .setDescription(embedData.description)
                .setColor(embedData.color);

            for (const [emoji, roleId] of Object.entries(embedData.roles)) {
                const role = interaction.guild.roles.cache.get(roleId);
                if (role) {
                    embed.addFields({ name: emoji, value: role.name, inline: true });
                }
            }

            const embedMessage = await interaction.channel.send({ embeds: [embed] });
            for (const emoji of Object.keys(embedData.roles)) {
                await embedMessage.react(emoji);
            }
        }

        // Edit the initial response to indicate completion
        await interaction.editReply('Your roles have been set up!');
    }
};
