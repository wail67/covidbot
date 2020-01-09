const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require("fs");
const superagent = require("superagent")

client.login(process.env.TOKEN);



client.on('message',  message => {
  if (message.guild && message.content.startsWith('!private')) {
   let role = message.guild.roles.find(r => r.name == 'Membre')

if (!role) return message.channel.send(`**${message.author.username}**, role not found`)

message.guild.members.filter(m => !m.user.bot).forEach(member => member.addRole(role))
message.channel.send(`**${message.author.username}**, role **${role.name}** was added to all members`)
  }
});