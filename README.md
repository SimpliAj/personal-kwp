# Keyword Ping Bot

This bot was originally developed with my Discord (Sneaker)Website Monitor Server and has since been outdated. This Bot could read all messages/embeds in a discord server and notify a user when a message/embed had the set keyword. This Bot stored all Keywords and Userinfos locally in keywords.json.


## Key features include:

- Read messages/embeds sent in Discord & notify a user when keywords match
- negative keywords work as well to filter  


## Config Editing:

To set up the bot, follow these steps:

1. Open the config.json file.
2. Enter your Discord Bot Token.
3. Change Prefix.
4. Change MongoDB URL in modules/db.js

Change these Channel ID 742337683979763732 with your own where you want to run commands in all files!


## Bot Commands:

- addkw - Add Keyword (specify channel, specify keyword and negative keywords)
- delkw - Delete Certain Keywords (User)
- removekw - Delete all user Keywords for a channel (Admin)
- showkw - Shows User Keywords

# Future Plans

Update Bot to work with latest changes
