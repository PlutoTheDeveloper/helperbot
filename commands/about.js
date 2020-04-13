const {RichEmbed} = require("discord.js")
const fs = require("fs");

exports.run = async (client, message, args, prefixes, prefix) => {
  
  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.round(totalSeconds % 60);
  let uptime = `${hours} hrs ${minutes} mins ${seconds} secs`;
  
  const embed = new  RichEmbed()
  .setColor("#ff0000")
  .addField(`Version`, `1.0`, true)
  .addField(`Node JS`, `8.x`, true)
  .addField(`Library`, `[discord.js](https://discord.js.org/#/)`, true)
  .addField(`Uptime`, `${uptime}`, true)
  .addField(`Servers`, `${client.guilds.size}`, true)
  .addField(`Users`, `${client.users.size}`, true)
  .addField(`Website`, `[Not available yet]`, true)
  .addField(`Discord`, `[Not available yet]`, true)
  .addField(`Invite`, `[Not available yet]`, true)
  .addField(`Developer`, `Shinowaku#0651`, true)
  .setFooter(`Prefix: ${prefix} | This bot is still under construction`)
  .setTimestamp()
  message.channel.send(embed)   
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: 'about',
    description: 'Displays information on this bot',
    usage: 'about'
};