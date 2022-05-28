module.exports = {
    name: 'skip',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Aucune musique n'est diffusée actuellement ${message.author}... Réessayer ? ❌`);

        const success = queue.skip();

        return message.channel.send(success ? `Musique actuelle ${queue.current.title} a sauté ✅` : `Quelque chose a mal tourné ${message.author}... Réessayer ? ❌`);
    },
};