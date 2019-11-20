module.exports = (client) => {
    client.user.setPresence({
        game: {
            name: "Je suis là"
        }
    });
};