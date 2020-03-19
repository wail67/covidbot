const Discord = require("discord.js");
const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exÃ©cuter cette commande!");
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
        .then(connection => {
            let embed = new Discord.RichEmbed()
            .setTitle("Skyrock")
            .setDescription("**Connected**")
            .setColor('#606060')
			.setURL("http://skyrock.fm/")
			.setImage("https://i.imgur.com/9ttfdCG.png")
			.setTimestamp()
            connection.playArbitraryInput(`http://icecast.skyrock.net/s/natio_mp3_128k?type=.mp3`);
			message.channel.send(embed);
			message.delete().catch();
        })
        .catch(console.log);
    } else {
        message.reply('Tu dois etre dans un channel vocal !');
    }
};

module.exports.help = {
    name: "skyrock"
}    