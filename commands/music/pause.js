module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`Aucune musique n'est diffusée actuellement ${message.author}... Réessayer ? ❌`);

        const success = queue.setPaused(true);

        return message.channel.send(success ? `Musique actuelle ${queue.current.title} interrompu ✅` : ` Quelque chose a mal tourné ${message.author}... Réessayer ? ❌`);
    },
};