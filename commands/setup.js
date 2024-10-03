const { MessageEmbed } = require('discord.js');
const { roleMapping } = require('../roleMapping');

module.exports = {
    name: 'setup',
    description: 'Sets up reaction roles',

    async execute(message, client) {
        const roleEmbedMapping = [
            {
                title: "Color Roles",
                description: "React to get your color role!",
                color: "BLUE",
                roles: {
                    '🔴': roleMapping.roleMapping['🔴'],
                    '🟢': roleMapping.roleMapping['🟢'],
                    '🔵': roleMapping.roleMapping['🔵']
                }
            },
            {
                title: "Game Roles",
                description: "React to get your game role!",
                color: "GREEN",
                roles: {
                    '🎮': roleMapping.roleMapping['🎮'],
                    '⚔️': roleMapping.roleMapping['⚔️'],
                    '🏹': roleMapping.roleMapping['🏹']
                }
            }
        ];

        for (const embedData of roleEmbedMapping) {
            const embed = new MessageEmbed()
                .setTitle(embedData.title)
                .setDescription(embedData.description)
                .setColor(embedData.color);

            for (const [emoji, roleId] of Object.entries(embedData.roles)) {
                const role = message.guild.roles.cache.get(roleId);
                if (role) {
                    embed.addField(emoji, role.name, true);
                }
            }

            const embedMessage = await message.channel.send({ embeds: [embed] });
            for (const emoji of Object.keys(embedData.roles)) {
                await embedMessage.react(emoji);
            }
        }
    }
};
