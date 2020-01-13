const Discord = require('discord.js');
const fs = require("fs");
const  {stripIndents}  = require("common-tags");

module.exports.run = (client, message, args, warns) => {
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) {
    let text = "Salut va valider les règles"; // cuts off the /private part
    message.guild.members.forEach(member => {
      if (member.id != client.user.id && !member.user.bot) member.send(text);
    });
  }

    }

;

module.exports.help = {
    name: 'send'
};