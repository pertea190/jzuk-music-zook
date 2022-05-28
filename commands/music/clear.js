module.exports = {
    name: 'clear',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Aucune musique ne joue actuellement ${message.author}... Réessayer ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`Aucune musique dans la file d'attente après la musique actuelle ${message.author}... Réessayer ? ❌`);

        await queue.clear();

        message.channel.send(`La file d'attente vient d'être vidée 🗑️`);
    },
};