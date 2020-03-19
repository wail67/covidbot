const Discord = require("discord.js")
const colours = require("../colours.json")

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    console.log(rMember);

}

module.exports.config = {
    name: "addrole",
    description: "Adds a role to a member of the guild!",
    usage: "!addrole",
    accessableby: "Moderators",
    aliases: ["ar", "roleadd"]
}