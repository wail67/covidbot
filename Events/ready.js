module.exports = (client) => {
    client.user.setPresence({
        game: {
            name: "!help et je viens à ton secours"
        }
    });
};