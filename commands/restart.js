const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!message.author.id === "590910244679581709") return message.channel.send(":x: Only usable by Developers.");
    message.channel.send(':wave: ***Bot Is Restarding*** Be right back!').then(() => {
    process.exit(134);
   });
};
    
module.exports.help = {
        name: 'restart',
        usage: 'restart',
        description: 'Restarts the bot'
};