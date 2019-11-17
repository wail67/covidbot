const Discord = require('discord.js');
const prefix = '!';

module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') { return; }
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) { return; }
    if (!message.content.startsWith(prefix)) { return; }

        let arg = message.content.slice(prefix.length).trim().split(/ +/g);
        let args = message.content.trim().split(/ +/g)
        let commande = arg.shift();
        let cmd = client.commands.get(commande);

        if (!cmd) { return; }
            cmd.run(client, message, args);
};