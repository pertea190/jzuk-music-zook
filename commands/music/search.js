const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['sh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Veuillez entrer une recherche valide ${message.author}... Réessayer ? ❌`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`Aucun résultat trouvé ${message.author}... Réessayer ? ❌`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setAuthor(`Resultats pour ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nSélectionnez le choix entre **1** et **${maxTracks.length}** ou **cancel** ⬇️`);

        embed.setTimestamp();
        embed.setFooter('La musique avant tout - ❤️', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(`Recherche annulée ✅`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Réponse non valide, essayez une valeur entre **1** et **${maxTracks.length}** ou **cancel**... Réessayer ? ❌`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.channel.send(`Je ne peux pas rejoindre le canal vocal ${message.author}... Réessayer ? ❌`);
            }

            await message.channel.send(`Chargement de votre recherche... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(`La recherche a expiré ${message.author}... Réessayer ? ❌`);
        });
    },
};