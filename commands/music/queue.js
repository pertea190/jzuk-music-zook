const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`Aucune musique n'est diffusée actuellement ${message.author}... Réessayer ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`Aucune musique dans la file d'attente après la musique actuelle ${message.author}... Réessayer ? ❌`);

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setColor('RED');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor(`Server queue - ${message.guild.name} ${methods[queue.repeatMode]}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `Et **${songs - 5}** autre son(s)...` : `Dans la playlist **${songs}** son(s)...`;

        embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter('Musique avant tout - ❤️', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};