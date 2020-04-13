exports.run = async (client, message, args, level) => {
  try {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Don't have ***PERMISSION*** to use this command!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Unable To kick that person, Try Again Later!");
    
    await message.channel.send('Unmuting Channel...');
    
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    });
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  }
};

exports.help = {
  name: 'unmutechannel',
  category: 'Moderation',
  description: 'Unmutes the channel',
  usage: 'unmutechannel'
};