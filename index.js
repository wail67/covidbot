const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const fs = require("fs");
const superagent = require("superagent")





client.on("guildMemberAdd", user => {
  user.guild.channels
    .get("642763590985580594")
    .send("Bienvenue " + user + " sur le serveur " + user.guild.name + "!");
  user.guild.channels
    .get("642763590985580594")
    .send(
      "https://giphy.com/gifs/welcome-austin-powers-dr-evil-l0MYC0LajbaPoEADu"
    );
});



fs.readdir('./Commandes/', (error, f) => {
   if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        console.log(commandes.length)
       commandes.forEach((f, i) => {
        let pull = require(`./Commandes/${f}`);
        client.commands.set(pull.help.name, pull);  
        pull.help.aliases.forEach(alias => {
          client.aliases.set(alias, pull.help.name)
        });
    });
        });
        
  

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
  
});

client.login(process.env.TOKEN);