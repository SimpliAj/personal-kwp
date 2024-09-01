module.exports.run = async (client, message, args) => {
  if (message.channel.id === '742337683979763732') {
let rChannel = message.mentions.channels.first()
    if (rChannel) {
  let keywordList = "Current keywords:" + "\n";
  let exists = searchChannel(rChannel.id, client.save);
  if (!exists) {
    message.reply("Channel doesn't have any keywords!");
  } else {
    exists.realword.forEach((realwords) => {
      keywordList += realwords + "\n";
    });
    message.reply(keywordList);
  }
} else return message.channel.send("Please enter a channel to show keywords for.")
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
  name: "showkw",
  description: "Shows a keyword",
  usage: "!showkw",
  accessableby: "Members",
  aliases: ['showkeyword']
}
