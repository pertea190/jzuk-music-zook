const maxVol = client.config.opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Aucune musique n'est diffusée actuellement ${message.author}... Réessayer ? ❌`);

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send(`Le volume actuel est de ${queue.volume} 🔊\n*Pour modifier le volume, entrez un nombre valide entre **1** et **${maxVol}**.*`);

        if (queue.volume === vol) return message.channel.send(`Le volume que vous voulez modifier est déjà le volume actuel. ${message.author}... Réessayer ? ❌`);

        if (vol < 0 || vol > maxVol) return message.channel.send(`Le numéro spécifié n'est pas valide. Saisissez un nombre entre **1** et **${maxVol}** ${message.author}... Réessayer ? ❌`);

        const success = queue.setVolume(vol);

        return message.channel.send(success ? `Le volume a été modifié pour **${vol}**/**${maxVol}**% 🔊` : `Quelque chose a mal tourné ${message.author}... Réessayer ? ❌`);
    },
};