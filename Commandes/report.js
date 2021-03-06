const Discord = require('discord.js');
const fs = require("fs");
const superagent = require("superagent")
const  {stripIndents}  = require("common-tags");


module.exports.run = async (client, message, args, warns) => {
   // If the bot can delete the message, do so
        if (message.deletable) message.delete();

        // Either a mention or ID
        let rMember = message.mentions.members.first() || message.guild.members.get(args[1]);
        // No person found
        if (!rMember)
            return message.reply("Couldn't find that person?").then(m => m.delete(5000));
  
        // The member has BAN_MEMBERS or is a bot
        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Can't report that member").then(m => m.delete(5000));

        // If there's no argument
        if (!args[2])
            return message.channel.send("Please provide a reason for the report").then(m => m.delete(5000));
        
        
        const embed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Report", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**> L'accusé:** ${rMember} (${rMember.user.id})
            **> Plainte déposé par:** ${message.member}
            **> Lieu de la déposition de plainte:** ${message.channel}
            **> Raison de la plainte:** ${args.slice(2).join(" ")}`);

        return message.guild.channels.get("646719645721690152").send(embed);
};

module.exports.help = {
    name: 'report'
};