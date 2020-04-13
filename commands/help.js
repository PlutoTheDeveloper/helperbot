const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let helpembed = new Discord.RichEmbed()
.setDescription("**Help Menu**")
.setColor('#ff0000')
.addField("Default Prefix:", "`-`")
.addField("**Help Menu**", "here is a list of commands the bot can do")
.addField("About", "displays what this bot can do")
.addField("Report", "reports user")
.addField("Ping", "bot responds ping and how many miliseconds")
.addField("Cat", "shows random cat pics")
.addField("Doggo", "shows random dog pics");

message.channel.send(helpembed);

if(message.member.hasPermission("MANAGE_MESSAGES")){
let modembed = new Discord.RichEmbed()
.setDescription("**Mod Help Menu**")
.setColor("#ff0000")
.addField("Default Prefix:", "`!`")
.addField("**Mod Commands**", "List of Mod Commands and usage")
.addField("addrole", "Adds role to user")
.addField("removerole", "Removes role from user")
.addField("warn", "Warns a user")
.addField("warnlevel", "Warning Level")
.addField("kick", "Kicks a user")
.addField("ban", "Bans a user")
.addField("tempmute", "Tempory mute on users can be done as s,m,h,d")
.addField("mute", "Mutes user")
.addField("unmute", "Unmute user")
.addField("clear", "Messaged Deleter")
.addField("prefix", "Allows you to change prefix")
.addField("stats", "Displays bot stats")
.addField("guilds", "Displays servers the bot is in")
.addField("serverinfo", "Displays server information")
.addField("<command> help", "Shows usage for command");

try{
  await message.author.send(modembed);
  message.react("✔️");
}catch(e){
  message.reply("Your DM's are locked... I cannot send you the mod commands..");  
}


    }
}

module.exports.help = {
    name: "help"
}