const { Events } = require('discord.js');
const { roleMapping } = require('../roleMapping');

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user) {
        // Ignore if the reaction is from a bot
        if (user.bot) return;

        // Check if the reaction is on a message from the bot
        if (!reaction.message.guild || reaction.message.partial || reaction.partial) {
            return;
        }

        // Get the role ID associated with the emoji
        const roleId = roleMapping.roleMapping[reaction.emoji.name];

        // If there's no role for the emoji, exit
        if (!roleId) return;

        // Get the role from the guild
        const role = reaction.message.guild.roles.cache.get(roleId);

        // If the role doesn't exist, exit
        if (!role) return;

        // Add the role to the member
        const member = await reaction.message.guild.members.fetch(user.id);
        await member.roles.add(role);
    },
};
