const Discord = require('discord.js');
const fs = require("fs");
const superagent = require("superagent")

module.exports.run = (client, message, args, warns) => {
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[1];
  let modlog = client.channels.find('name', 'commande-admin');
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
  if (!user) return message.reply('You must supply a User Resolvable, such as a user id.')
  message.guild.unban(user, {reason : reason});
};

module.exports.help = {
    name: 'unban'
};