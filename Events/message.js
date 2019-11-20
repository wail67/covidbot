const Discord = require('discord.js');
const prefix = '!';
const fs = require("fs");
module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') { return; }
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) { return; }
    if(message.channel.id != 644670906375077898) return;
    if (!message.content.startsWith(prefix)) { return; }
                
        const warns = JSON.parse(fs.readFileSync("./warns.json"));
        let arg = message.content.slice(prefix.length).trim().split(/ +/g);
        let args = message.content.trim().split(/ +/g)
        let commande = arg.shift();
        let cmd = client.commands.get(commande) || client.commands.get(client.aliases.get(commande))

        if (!cmd) { return; }
            cmd.run(client, message, args,warns);
};