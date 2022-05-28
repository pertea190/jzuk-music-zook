module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) return int.reply({ content: `Aucune musique n'est diffusée actuellement... Réessayer ? ❌`, ephemeral: true, components: [] });

            int.member.send(`Vous avez sauvegardé la piste ${queue.current.title} | ${queue.current.author} du serveur ${int.member.guild.name} ✅`).then(() => {
                return int.reply({ content: `Je vous ai envoyé le titre de la musique par messages privés. ✅`, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `Impossible de vous envoyer un message privé... Réessayer ? ❌`, ephemeral: true, components: [] });
            });
        }
    }
};