const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();


client.login(process.env.TOKEN);

const warns = JSON.parse(fs.readFileSync("./warns.json"));

client.on("message", message => {
  if (!message.guild) return;
  let args = message.content.trim().split(/ +/g);
  if (message.content.startsWith("!hello")) {
    message.channel.send("Bonjour " + message.author + "!");
  }
  if (message.content.startsWith("!test")) {
    message.reply("Je suis là man");
    console.log("JE suis la gros");
  }
  if (message.content.startsWith("!bg")) {
    message.channel.send(message.author + " Bien joué bg !");
  }
  if (message.content.startsWith("!avatar")) {
    // Send the user's avatar URL
    message.channel.send(message.author.avatarURL);
  }

  if (message.content.startsWith("!kick")) {
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
  }

  if (message.content.startsWith("!ban")) {
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
        member.guild
          .ban(member, {
            days: day,
            reason: reason
          })
          .then(() => {
            message.reply(`${user.tag} a été ban avec succès `);
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
      message.reply("Tu n'a pas mentionné la personne à ban !");
    }
  }

  if (message.content.startsWith("!warn")) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande"
      );
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("Veuillez mentionner un membre");
    if (
      member.highestRole.calculatedPosition >=
        message.member.highestRole.calculatedPosition &&
      message.author.id !== message.guild.ownerID
    )
      return message.channel.send("Vous ne pouvez pas warn ce membre");
    let reason = args.slice(2).join(" ");
    if (!reason) return message.channel.send("Veuillez indiquer une raison");
    if (!warns[member.id]) {
      warns[member.id] = [];
    }
    warns[member.id].unshift({
      reason: reason,
      date: Date.now(),
      mod: message.author.id
    });
    fs.writeFileSync("./warns.json", JSON.stringify(warns));
    message.channel.send(
      member + " a été warn pour " + reason + " :white_check_mark:"
    );
  }
  if (message.content.startsWith("!infra")) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande"
      );
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("Veuillez mentionner un membre");
    let embed = new Discord.RichEmbed()
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .addField(
        "10 derniers warns",
        warns[member.id] && warns[member.id].length
          ? warns[member.id].slice(0, 10).map(e => e.reason)
          : "Ce membre n'a aucun warns"
      )
      .setTimestamp();
    message.channel.send(embed);
  }

  if (message.content.startsWith("!unwarn")) {
    let member = message.mentions.members.first();
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande."
      );
    if (!member) return message.channel.send("Membre introuvable");
    if (
      member.highestRole.calculatedPosition >=
        message.member.highestRole.calculatedPosition &&
      message.author.id !== message.guild.ownerID
    )
      return message.channel.send("Vous ne pouvez pas unwarn ce membre.");
    if (!member.manageable)
      return message.channel.send("Je ne pas unwarn ce membre.");
    if (!warns[member.id] || !warns[member.id].length)
      return message.channel.send("Ce membre n'a actuellement aucun warns.");
    warns[member.id].shift();
    fs.writeFileSync("./warns.json", JSON.stringify(warns));
    message.channel.send(
      "Le dernier warn de " + member + " a été retiré :white_check_mark:"
    );
  }
  if (message.content.startsWith("!clearall")) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande"
      );
  async function purge() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

            // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
            if (!message.member.roles.find("name", "BOSS")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`BOSS\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[1])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage:  !clear <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[1]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }
  purge();
  }

  if (message.content.startsWith("!mute")) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande"
      );
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("Membre introuvable");
    if (
      member.highestRole.calculatedPosition >=
        message.member.highestRole.calculatedPosition &&
      message.author.id !== message.guild.ownerID
    )
      return message.channel.send("Vous ne pouvez pas mute ce membre");
    if (!member.manageable)
      return message.channel.send("Je ne peux pas mute ce membre");
    let muterole = message.guild.roles.find(role => role.name === "Muted");
    if (muterole) {
      member.addRole(muterole);
      message.channel.send(member + " a été mute :white_check_mark:");
    } else {
      message.guild
        .createRole({ name: "Muted", permissions: 0 })
        .then(function(role) {
          message.guild.channels
            .filter(channel => channel.type === "text")
            .forEach(function(channel) {
              channel.overwritePermissions(role, {
                SEND_MESSAGES: false
              });
            });
          member.addRole(role);
          message.channel.send(member + " a été mute :white_check_mark:");
        });
    }
  }

  if (message.content.startsWith("!unmute")) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande."
      );
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("Membre introuvable");
    if (
      member.highestRole.calculatedPosition >=
        message.member.highestRole.calculatedPosition &&
      message.author.id !== message.guild.ownerID
    )
      return message.channel.send("Vous ne pouvez pas unmute ce membre.");
    if (!member.manageable)
      return message.channel.send("Je ne pas unmute ce membre.");
    let muterole = message.guild.roles.find(role => role.name === "Muted");
    if (muterole && member.roles.has(muterole.id)) member.removeRole(muterole);
    message.channel.send(member + " a été unmute :white_check_mark:");
  }
});

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

        commandes.forEach((f) => {
            let commande = require('Commandes/`${f}`');
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});
