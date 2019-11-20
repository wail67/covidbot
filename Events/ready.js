module.exports = (client) => {
    client.user.setPresence({
        game: {
            name: "Baise tes mort"
        }
    });
};