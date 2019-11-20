const Discord = require('discord.js');
const fs = require("fs");
const  {stripIndents}  = require("common-tags");


module.exports.run = (client, message, args, warns) => {
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) {
      let member = message.guild.member(message.author);
      let reason = "Utilisation de commande inaproprié";
      if (!warns[member.id]) {
        warns[member.id] = [];
      }
      warns[member.id].unshift({
        reason: reason,
        date: Date.now()
      });
      fs.writeFileSync("./warns.json", JSON.stringify(warns));
      message.channel.send("Vous ne pouvez pas warn ce membre");

      return message.channel.bulkDelete(2, true);
    }

     if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

   let banMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

   banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
   message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))

    let embed = new Discord.RichEmbed()
    .setColor('#f94343')
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .setDescription(stripIndents`**> L'accusé:**  ${banMember.user.username} (${banMember.user.id}))
            **> Modérateur:** ${message.author}
            **> Raison de la plainte:** ${args.slice(2).join(" ")}`);
    
        let sChannel = message.guild.channels.find(c => c.name === "log-ban")
        sChannel.send(embed)
    
};

module.exports.help = {
    name: 'ban'
};