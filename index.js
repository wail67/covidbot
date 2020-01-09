const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require("fs");
const superagent = require("superagent")

client.login(process.env.TOKEN);



client.on('message', msg => {
  if (msg.guild && msg.content.startsWith('!private')) {
    let text = msg.content.slice('/private'.length);// cuts off the /private part
    let role = msg.guild.roles.find('visiteurs') 
    msg.guild.members.forEach(member => {
      member.user.addRole(664879015152320512).catch(e => console.log(e.message))
    });
  }
});