module.exports = {
    name: 'stop',
    aliases: ['dc'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Aucune musique n'est diffusée actuellement ${message.author}... Réessayer ? ❌`);

        queue.destroy();

        message.channel.send(`La musique s'est arrêtée dans ce serveur, à la prochaine fois. ✅`);
    },
};