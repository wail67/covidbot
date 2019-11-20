module.exports = (client) => {
    client.user.setPresence({
        game: {
            name: "!help pour demander de l'aide"
        }
    });
};