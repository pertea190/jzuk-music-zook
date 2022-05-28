const ms = require('ms');

module.exports = {
    name: 'seek',
    aliases: [],
    utilisation: '{prefix}seek [time]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Aucune musique n'est diffusée actuellement ${message.author}... Réessayer ? ❌`);

        const timeToMS = ms(args.join(' '));

        if (timeToMS >= queue.current.durationMS) return message.channel.send(`Le temps indiqué est supérieur au temps total de la chanson en cours. ${message.author}... Réessayer ? ❌\n*Essayez par exemple une heure valide comme **5s, 10s, 20 secondes, 1m**...*`);

        await queue.seek(timeToMS);

        message.channel.send(`Temps réglé sur la chanson en cours **${ms(timeToMS, { long: true })}** ✅`);
    },
};