const {RichEmbed} = require("discord.js")
const weather = require("weather-js");

exports.run = async (client, message, args) => {
weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
  if (err) message.channel.send(err);
  if (!args[0] || args[0] == "help") {
    message.reply("Usage: !weather <city>, <state/country>")
    return; 
  }
    var current = result[0].current;
    var location = result[0].location;

    const embed = new RichEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather for ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor("#7289DA")
      .addField('Timezone',`UTC${location.timezone}`, true)
      .addField('Degree Type',location.degreetype, true)
      .addField('Temperature',`${current.temperature} Degrees`, true)
      .addField('Feels Like', `${current.feelslike} Degrees`, true)
      .addField('Winds',current.winddisplay, true)
      .addField('Humidity', `${current.humidity}%`, true)
    message.channel.send({embed});
 });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['we'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'weather',
    description: 'Gives you a random response to a question.',
    usage: '8ball [question]'
};