player.on('error', (queue, error) => {
    console.log(`Erreur émise par la file d'attente ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Erreur émise par la connexion ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send(`J'ai commencé à jouer ${track.title} dans **${queue.connection.channel.name}** 🎧`);
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`Piste ${track.title} ajouté dans la file d'attente ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('J\'ai été déconnecté manuellement du canal vocal, en effaçant la file d\'attente.... ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Personne n\'est dans le canal vocal, quitter le canal vocal... ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('J\'ai fini de lire toute la file d\'attente ✅');
});