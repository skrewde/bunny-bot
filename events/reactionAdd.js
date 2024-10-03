module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user, client) {
        if (user.bot) return;  // Ignore bot reactions
        const { guild } = reaction.message;

        const roleEmbedMapping = [
            {
                roles: {
                    '🔴': 'ROLE_ID_FOR_RED',
                    '🟢': 'ROLE_ID_FOR_GREEN',
                    '🔵': 'ROLE_ID_FOR_BLUE'
                }
            },
            {
                roles: {
                    '🎮': 'ROLE_ID_FOR_GAMER',
                    '⚔️': 'ROLE_ID_FOR_WARRIOR',
                    '🏹': 'ROLE_ID_FOR_ARCHER'
                }
            }
        ];

        for (const embedData of roleEmbedMapping) {
            const roleId = embedData.roles[reaction.emoji.name];
            if (roleId) {
                const role = guild.roles.cache.get(roleId);
                const member = guild.members.cache.get(user.id);
                if (role && member) {
                    await member.roles.add(role);
                    await user.send(`You have been given the ${role.name} role!`);
                }
                break;
            }
        }
    }
};
