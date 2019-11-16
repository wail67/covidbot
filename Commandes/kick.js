const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) {
      return message.channel.send("Vous n'avez pas la permission !");
    }
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        let reason = args.slice(2).join(" ");
        if (!reason)
          return message.channel.send("Veuillez indiquer une raison");
        member
          .kick(reason)
          .then(() => {
            message.reply(
              `${user.tag} a été kick avec succès pour la raison suivante: ` +
                reason
            );
          })
          .catch(err => {
            message.reply("Je n'ai pas la permission de kick qui que ce soit");
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("Cette personne n'est pas présente sur le serveur");
      }
    } else {
      message.reply("Tu n'a pas mentionné la personne à kick !");
    }
  
};

module.exports.help = {
    name: 'kick'
};