# DiteCross
Discord-Telegram Cross messaging system

![DiteCross Example](/readme_assets/example.png)

A bot that automatically relays Discord and Telegram messages from one group to another.

## Installation
DiteCross is based on NodeJS with `npm`, so make sure to have both of them installed.
To install DiteCross just type `npm install`

## Getting started
Make sure to have both **token**s to login to Telegram and Discord.

### How to register a Telegram token
For Telegram you have to talk with @BotFather and follow the procedure to make a new bot. [@DiteCross_bot](https://telegram.me/DiteCross_bot) is the official one (not 24/7 yet).
The token should be placed in a `telegram.ini` file like below:

```
[token]
PLACE_TOKEN_HERE
```

### How to register a Discord token
For Discord you have to create a new User Bot and place the token in a `discord.ini` file, like you did for Telegram.

## First time run and handshake
To run DiteCross just type `node ditecross.js`

The handshake process is described below:
1. Type `/handshake` on Telegram
2. DiteCross asks you to insert Discord server and channel names, like this: `@ServerName#ChannelName`
3. If DiteCross is present on that server and channel, it will ask you to type `/handshake` there; do it
4. Enjoy!

NOTE: I hope to have built a robust and simple handshaking system. If you have one better in mind, please let me know!

**Be aware that DiteCross is not stable, yet.**

That's it, enjoy! If you have questions / problems / whatsoever, feel free to open an issue here on GitHub or contact me via email (see my profile).
