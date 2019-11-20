const Discord = require('discord.js');
const fs = require("fs");
const superagent = require("superagent")
const  {stripIndents}  = require("common-tags");


module.exports.run = async (client, message, args, warns) => {
  if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

    let bannedMember = await client.fetchUser(args[1])
        if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")

    let reason = args.slice(2).join(" ")
        if(!reason) reason = "No reason given!"
    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command!")|
    message.delete()
    try {
        message.guild.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} has been unbanned from the guild!`)
    } catch(e) {
        console.log(e.message)
    }

    let embed = new Discord.RichEmbed()
    .setColor("#f94343")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .setDescription(stripIndents`**> Type :** unban
            **> Modérateur :** ${message.author}
            **> Le Revenant :** ${bannedMember.username} (${bannedMember.id})
            **> Raison de la plainte:** ${reason}`);
    
        let sChannel = message.guild.channels.find("name","log-ban")
        sChannel.send(embed)

};

module.exports.help = {
    name: 'unban'
};