const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require("fs");
const superagent = require("superagent")


fs.readdir('./Commandes/', (error, f) => {
   if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'ts');
        console.log(commandes.length)
        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
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