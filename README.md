# DiteCross
Discord-Telegram Cross messaging system

![Discord Example](/readme_assets/discord.PNG)
![Telegram Example](/readme_assets/telegram.PNG)

This program is just a proof of concept to demonstrate the possibility to relay Discord and Telegram messages from one group to another.

## Installation
DiteCross is based on NodeJS (so make sure to have it) and relies upon some dependencies. Follow these commands to install them with `npm`:

```
npm install --save --no-optional discord.js
npm install --save node-telegram-bot-api
npm install --save readline
```

## Getting started
Make sure to have both **token**s to login to Telegram and Discord.

### How to register a Telegram token
For Telegram you have to talk with @BotFather and follow the procedure to make a new bot. **DiteCross_bot** name is already taken by me.
The token should be placed in a `telegram.ini` file like below:

```
[token]
PLACE_TOKEN_HERE
```

### How to register a Discord token
For Discord you have to create a new account and place the token in a `discord.ini` file, like you did for Telegram.

In case you don't know how to get a Discord token, just place in `discord.ini` file DiteCross' email and password. They will be replaced at first login with the correct token. Follow this model:

```
[email]
PLACE_EMAIL_HERE
PLACE_PASSWORD_HERE
```

## First time run
To run DiteCross just type `node ditecross.js`

If everything works correctly, you should have successful messages at startup as described below:

```
DiteCross - Made by corsaro
[Telegram] Login successful
[Discord] Login successful
```

Make sure that DiteCross bots are both in **ONE** discord channel and **ONE** Telegram group or private channel. Make a "test message" on both ends so that DiteCross can understand where to relay the messages.

**Remember that this is a proof of concept, not a end-user and secure final program.**

That's it, enjoy! If you have questions / problems / whatsoever, feel free to open an issue here on GitHub or contact me via email (see my profile).
