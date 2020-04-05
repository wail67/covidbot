module.exports = (client) => {
  guild = client.guild.size
    client.user.setPresence({
        game: {
            name: "Stream Skyrock sur"+ guild
        }
    });
};