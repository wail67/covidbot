const Discord = require("discord.js");
const client = new Discord.Client();


client.login("process.env.TOKEN");



client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    if (message.content.startsWith('!hello')) {
        message.channel.send("Bonjour " + message.author + "!");
    };
    if (message.content.startsWith('!bg')) {
        message.channel.send( message.author + " Bien joué bg !");
    };
    if (message.content.startsWith('!avatar')) {
        // Send the user's avatar URL
        message.channel.send(message.author.avatarURL);
    };

    if (message.content.startsWith('!kick')) {

        if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
            return message.channel.send('Vous n\'avez pas la permission !');
        }
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                let reason = args.slice(2).join(' ');
            if (!reason) return message.channel.send("Veuillez indiquer une raison")
                member.kick(reason).then(() => {
                    message.reply(`${user.tag} a été kick avec succès pour la raison suivante: `+reason );
                }).catch(err => {
                    message.reply('Je n\'ai pas la permission de kick qui que ce soit');
                    console.error(err);
                });
            } else {
                // The mentioned user isn't in this guild
                message.reply('Cette personne n\'est pas présente sur le serveur');
            }
        } else {
            message.reply('Tu n\'a pas mentionné la personne à kick !');
        }
    };

    if (message.content.startsWith('!ban')) {

        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
            return message.channel.send('Vous n\'avez pas la permission !');
        }
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                let reason = args.slice(2).join(' ')
                let day = args.slice(3).join(' ');
                console.log(day);
                member.guild.ban(member, {
                    days: day,
                    reason: reason,
                }).then(() => {
                    message.reply(`${user.tag} a été ban avec succès `);
                }).catch(err => {
                    message.reply('Je n\'ai pas la permission de kick qui que ce soit');
                    console.error(err);
                });
            } else {
                // The mentioned user isn't in this guild
                message.reply('Cette personne n\'est pas présente sur le serveur');
            }
        } else {
            message.reply('Tu n\'a pas mentionné la personne à ban !');
        }
    };

    if (message.content.startsWith("!unban")){
        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
            return message.channel.send('Vous n\'avez pas la permission !');
        }
        let banneduser = await bot.fetchUser(args[0])
        if (banneduser) {
            const member = banneduser;
            if (member) {
                    member.guild.unban(member).then(() => {
                    message.reply(`${user.tag} a été deban avec succès `);
                }).catch(err => {
                    message.reply('Je n\'ai pas la permission de deban qui que ce soit');
                    console.error(err);
                });
            } else {
                // The mentioned user isn't in this guild
                message.reply('Cette personne n\'est pas présente sur le serveur');
            }
        } else {
            message.reply('Tu n\'a pas mentionné la personne à deban !');
        }
    };

});

client.on("guildMemberAdd", user => {
    user.guild.channels.get("642763590985580594").send("Bienvenue " + user + " sur le serveur " + user.guild.name + "!")
    user.guild.channels.get("642763590985580594").send("https://giphy.com/gifs/welcome-austin-powers-dr-evil-l0MYC0LajbaPoEADu")
});