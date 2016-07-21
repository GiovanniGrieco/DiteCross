# DiteCross
Discord-Telegram Cross messaging system

![DiteCross Example](/readme_assets/example.png)

This program demonstrates the possibility to relay Discord and Telegram messages from one group to another.

## Installation
DiteCross is based on NodeJS with `npm`, so make sure to have both of them installed. To install DiteCross just type

```
npm install
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
For Discord you have to create a new User Bot and place the token in a `discord.ini` file, like you did for Telegram.

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
