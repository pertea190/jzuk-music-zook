const ms = require('ms');

module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`Dernier battement de cœur calculé ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago **${client.ws.ping}ms** 🛰️`);
    },
};