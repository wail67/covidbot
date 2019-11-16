const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();




const warns = JSON.parse(fs.readFileSync("./warns.json"));


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

fs.readdir('Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }
        console.log(f)
        commandes.forEach((f) => {
            let commande = require('Commandes/'+ f);
            console.log(f+'commande chargée !');
            client.commands.set(commande.help.name, commande);
        });
});

client.login(process.env.TOKEN);