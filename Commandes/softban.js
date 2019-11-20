const Discord = require('discord.js');
const fs = require("fs");
const superagent = require("superagent")
const  {stripIndents}  = require("common-tags");

module.exports.run = async (client, message, args, warns) => {
  
   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

   let banMember = message.mentions.members.first() || message.guild.members.get(args[1]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let reason = args.slice(2).join(" ");
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

   banMember.send(`Salut, tu as été ban de ${message.guild.name} pour: ${reason}. Essaye de te faire discret quand tu pourra revenir`).then(() =>
   message.guild.ban(banMember, { days: 2, reason: reason})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))

    let embed = new Discord.RichEmbed()
    .setColor("#f94343")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .setDescription(stripIndents`**> L'accusé:** ${banMember} (${banMember.user.id})
            **> Modérateur :** ${message.author}
            **> Raison de la plainte:** ${args.slice(2).join(" ")}`);
    
        let sChannel = message.guild.channels.find(c => c.name === "log-ban")
        sChannel.send(embed)
   


};

module.exports.help = {
    name: 'softban'
};