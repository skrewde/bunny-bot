module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Check if the command exists
        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing that command.');
        }
    },
};
