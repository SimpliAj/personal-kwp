const db = require("../models/db");

module.exports.run = async (client, message, args) => {
  if (message.channel.id === '742337683979763732') {
  if (args) {
    let rChannel = message.mentions.channels.first()
    if (rChannel) {
    let keyword = message.content.split(`!delkw`).join("")
     // console.log("1")
     let lowcasekeyword = keyword.toLowerCase()
    let exists = searchChannel(rChannel.id, client.save);
    if (!exists) {
      message.reply("Channel doesn't have associated config!");
    } else {
      let pos = exists.keywords.indexOf(lowcasekeyword);
      if (pos >= 0) {
        exists.keywords.splice(pos, 1);
        message.reply("Keyword removed!");
        await db.delete(`${lowcasekeyword}_${rChannel.id}`)
        client.saveFile();
      } else {
        message.reply("Keyword not found!");
      }
    }
  } else return message.channel.send("Please enter the channel to remove this keyword from!")
  }
} else return message.channel.send("Run this command in <#742337683979763732>!")
};

function searchChannel(channelID, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].channelID === channelID) {
      return myArray[i];
    }
  }
}
module.exports.config = {
  name: "removekw",
  description: "Removes a keyword",
  usage: "!removekw",
  accessableby: "Members",
  aliases: ['removekeyword']
}
