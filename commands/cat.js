const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {

  let{body} = await superagent
  .get(`http://aws.random.cat/meow`);

  let catembed = new Discord.RichEmbed()
  .setColor("#ff0000")
  .setTitle("Here Come's What You Asked For Lmao")
  .setImage(body.file);

  message.channel.send(catembed);

}
        
  module.exports.help = {
  name: "cat"
}