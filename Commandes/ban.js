const Discord = require('discord.js');
const fs = require("fs");

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
        let reason = args.slice(2).join(" ");
        let day = args.slice(3).join(" ");
        console.log(day);
        member.guild.ban(member, {days: 7, reason: "Insultes"})
          .then(() => {
      let embed = new Discord.RichEmbed()
      .setAuthor(message.author)
      .addField("Ban par" + message.author)
      .addField("Id : " + member.guild)
      .setTimestamp();
    message.channel.get("644670906375077898").send(embed);
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