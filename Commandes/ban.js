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

    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        let reason = args[2].split('&nbsp').join(' ')
        if(!reason) return
        let day = args[3]

        message.channel.send(day)
        member.guild.ban(member, {days: day, reason: reason})
          .then(() => {
      let embed = new Discord.RichEmbed()
    .setColor("#f94343")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .setDescription(stripIndents`**> L'accusé:**  (${member.user.id})
            **> Modérateur par:** ${message.author}
            **> Raison de la plainte:** ${args.slice(2).join(" ")}`);
    
        let sChannel = message.guild.channels.find(c => c.name === "log-ban")
        sChannel.send(embed)
          })
          .catch(err => {
            message.reply("Je n'ai pas la permission de ban cette personne");
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("Cette personne n'est pas présente sur le serveur");
      }
    } else {
      message.reply("Tu n'a pas mentionné la personne à ban !");
    }
};

module.exports.help = {
    name: 'ban'
};