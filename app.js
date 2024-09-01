const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');
const keywordsJSON = './keywords.json';
const fs = require("fs");
const db = require('./models/db.js')
var save = [];
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readFile(keywordsJSON, function(err, data) {
  save = JSON.parse(data);
  client.save = save;
});
client.saveFile = () => {fs.writeFile(keywordsJSON, JSON.stringify(client.save), () => {});};

client.on("ready", () => {
  console.log(`ready!`);
});
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js") 
  if(jsfile.length <= 0) {
       return console.log("[LOGS] Couldn't Find Commands!");
  }

  jsfile.forEach((f, i) => {
      let pull = require(`./commands/${f}`);
      client.commands.set(pull.config.name, pull);  
      pull.config.aliases.forEach(alias => {
          client.aliases.set(alias, pull.config.name)
      });
  });
});
client.on('message', async (message) => {
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let prefix = '!'
  let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
  if(commandfile) commandfile.run(client,message,args)
});
client.on('message', async (message) => {
  if (message.guild) {
    if (message.member.id != client.user.id) {
      if (!message.content.toLowerCase().startsWith(config.prefix)) {
        let found = false;
        let real = false;
        let embedText = "";
        let channel = searchChannelID(message.channel.id, save);
      //  console.log(channel)
        if (channel) {
          if (message.embeds) {
            message.embeds.forEach((embed) => {
              if (embed.description) {
                embedText += embed.description;
              }
              if (embed.fields) {
                embed.fields.forEach((field) => {
                  embedText += field.value;
                });
              }
            });
          }
          channel.keywords.forEach((keyword) => {
            let search = message.content.toLowerCase().search(keyword);
            if (embedText) {
              let search = embedText.toLowerCase().search(keyword);
             // toLowerCase().search(keyword);
              if (search >= 0) {
                found = keyword;
              }
            }
            if (search >= 0) {
              found = keyword;
            }
          });
        if (found) {
          channel.realword.forEach((realwords) => {
          if (found === realwords.toLowerCase()) {
            real = realwords
          }
          });
        //  console.log(found)
         const userID = await db.get(`${found}_${channel.channelID}`)
          const shadowkeyword = message.guild.channels.cache.find(channel => channel.id === '742337555042664478');
          shadowkeyword.send(`Keyword ***${real}*** has been matched at <#${channel.channelID}> https://discordapp.com/channels/718945362416762932/${channel.channelID}/${message.id} \n<@${userID}>`);
        }
      }
      }
    }
  }
});

client.login(config.token);

function searchChannelID(channelID, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].channelID === channelID) {
      return myArray[i];
    }
  }
}

function searchUserID(userID, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].userID === userID) {
      return myArray[i]
    }
  }
}

function embedToPlainText() {}
