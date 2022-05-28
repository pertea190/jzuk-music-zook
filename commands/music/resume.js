module.exports = {
    name: 'resume',
    aliases: ['rs'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`Aucune musique n'est diffusée actuellement ${message.author}... Réessayer ? ❌`);

        const success = queue.setPaused(false);

        return message.channel.send(success ? `Musique actuelle ${queue.current.title} a repris ✅` : `Quelque chose a mal tourné ${message.author}... Réessayer ? ❌`);
    },
};