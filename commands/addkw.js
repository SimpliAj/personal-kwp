const db = require('../models/db.js')

module.exports.run = async (client, message, args) => {
  if (message.channel.id === '742337683979763732') {
  if (args) {
    let rChannel = message.mentions.channels.first()
    if (rChannel) {
    let keyword = message.content.split(`!addkw ${rChannel} `).join("")
     // console.log("1")
     let lowcasekeyword = keyword.toLowerCase()
     console.log(`Keyword is ${lowcasekeyword}`)
    let exists = searchChannel(rChannel.id, client.save);
    if (!exists) {
      client.save.push({
        channelID: rChannel.id,
        userID: [message.author.id],
        keywords: [lowcasekeyword],
        realword: [keyword]
      });
      await db.set(`${lowcasekeyword}_${rChannel.id}`, message.author.id)
      message.reply("Channel specific Keyword added!");
      client.saveFile();
    } else {
   //   if (exists.userID === message.author.id) {
     if (exists.userID === message.author.id) {
      exists.keywords.push(lowcasekeyword);
      exists.realword.push(keyword)
      message.reply("Channel specific Keyword added!");
      client.saveFile();
     } else {
       await db.set(`${lowcasekeyword}_${rChannel.id}`, message.author.id)
     exists.userID.push(message.author.id)
      exists.keywords.push(lowcasekeyword);
      exists.realword.push(keyword)
      message.reply("Channel specific Keyword added!");
      client.saveFile();
     }
      /*
      } else {
        client.save.push({
          channelID: rChannel.id,
          userID: message.author.id,
          keywords: [lowcasekeyword],
          realword: [keyword]
        });
        message.reply("Channel specific Keyword added!");
        client.saveFile();
      }
      */
    }
  } else return message.channel.send("Please enter a channel to add this keyword into!")
}
  } else return message.channel.send("Run this command in <#742337683979763732>!")
}

function searchChannel(channelID, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].channelID === channelID) {
      return myArray[i];
    }
  }
}
module.exports.config = {
  name: "addkw",
  description: "Adds new keyword",
  usage: "!addkw",
  accessableby: "Members",
  aliases: ['addkeyword']
}