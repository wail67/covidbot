module.exports = (client) => {
    client.user.setPresence({
        game: {
            name: 'Stream Skyrock sur '+ client.guilds.size + " serveur(s)"
        }
    });
};