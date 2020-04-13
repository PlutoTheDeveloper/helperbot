const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const Welcome = require("discord-welcome");
bot.commands = new Discord.Collection();

let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 0;

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", () => {
  setInterval(async () => {
    let textList = ["Helper Bot 2.0"];
    var text = textList[Math.floor(Math.random() * textList.length)];
    bot.user.setActivity(text, { type: "STREAMING" });
  }, 1000); // milliseconds
});

bot.on("ready", () => {
  console.log("Servers:");
  bot.guilds.forEach(guild => {
    console.log(" ! " + guild.name);
  });
});

const invites = {};

const wait = require("util").promisify(setTimeout);

bot.on("ready", () => {
  wait(1000);

  // Load all invites for all guilds and save them to the cache.
  bot.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
//------ end first part of invite module ------------ //

// welcome member message module
bot.on("guildMemberAdd", member => {
  let channel = member.guild.channels.find("name", "welcome");
  let memberavatar = member.user.avatarURL;
  if (!channel) return;
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField(":bust_in_silhouette: | name : ", `${member}`)
    .addField(":microphone2: | Welcome!", `Welcome to the server, ${member}`)
    .addField(":id: | User :", "**[" + `${member.id}` + "]**")
    .addField(
      ":family_mwgb: | Your are the newest member",
      `${member.guild.memberCount}`
    )
    .addField("Name", `<@` + `${member.id}` + `>`, true)
    .addField("Server", `${member.guild.name}`, true)
    .setFooter(`**${member.guild.name}**`)
    .setTimestamp();

  channel.sendEmbed(embed);
});

bot.on("guildMemberAdd", member => {
  console.log(`${member}`, "has joined" + `${member.guild.name}`);
});

// leave member message module
bot.on("guildMemberRemove", member => {
  let channel = member.guild.channels.find("name", "leave");
  let memberavatar = member.user.avatarURL;
  if (!channel) return;
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField("Name:", `${member}`)
    .addField("Has Left the Server", ";(")
    .addField("Bye Bye :(", "We will all miss you!")
    .addField("The server now has", `${member.guild.memberCount}` + " members")
    .setFooter(`**${member.guild.name}`)
    .setTimestamp();

  channel.sendEmbed(embed);
});

// leave member DM message module
bot.on("guildMemberRemove", member => {
  console.log(
    `${member}` +
      "has left " +
      `${member.guild.name}` +
      " Sending leave message now"
  );
  console.log("Leave Message Sent");
});

bot.on("message", async message => {
  // bot dm module
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  //custom module
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  
  let prefix = prefixes[message.guild.id].prefixes;
  if (!message.content.startsWith(prefix)) return;
  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.");
  }
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    cooldown.add(message.author.id);
  }

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, cdseconds * 1000);

  //channel create / delete channel module
  bot.on("channelCreate", async channel => {
    console.log(`${channel.name} has been created.`);

    if (channel.type != "text") return;
    let sChannel = channel.guild.channels.find("name", "message_log");
    sChannel.send(`The channel ${channel} has been created`);
  });

  bot.on("channelDelete", async channel => {
    console.log(`${channel.name} has been Deleted.`);

    if (channel.type != "text") return;
    let sChannel = channel.guild.channels.find("name", "message_log");
    sChannel.send(`The channel ${channel} has been Deleted`);
  });
});

bot.login(process.env.BOT_TOKEN);
//You reached then end congrats and dont judge me I need // to remember things!
