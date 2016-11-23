# DiteCross
Discord-Telegram Cross messaging system

![DiteCross Example](/readme_assets/example.png)

A bot that automatically relays Discord and Telegram messages from one group to another.

NOTE:
Due to personal matters I can't develop this bot actively. I just made it to give an impulse on the community and look forward  to better ideas. I noticed that a new project was recently created and is better than this project, so please [take a look at it](https://github.com/trgwii/TediCross) if you want an up-to-date bot and ready to use. Thank you :)

## Installation
DiteCross is based on NodeJS with `npm`, so make sure to have both of them installed.

To install DiteCross just type `npm install`

## Getting started
Make sure to have both **token**s to login to Telegram and Discord.

### How to register a Telegram token
You should talk with [@BotFather](https://telegram.me/BotFather) and follow its procedure to make a new bot. ~~[@DiteCross_bot](https://telegram.me/DiteCross_bot) is the official one (not 24/7 yet).~~
The token must be placed in a `telegram.ini` file like below:

```
[token]
PLACE_TOKEN_HERE
```

### How to register a Discord token
You have to create a new User Bot and place the token in a `discord.ini` file, like you did for Telegram.

## First time run and handshake
To run DiteCross just type `node ditecross.js`

The handshake process is described below:

1. Type `/handshake` on Telegram
2. DiteCross asks you to insert Discord server and channel names, like this: `@ServerName#ChannelName` _(spaces are supported)_
3. If DiteCross is present on that server and channel, it will ask you to type `/handshake` there with a password
4. Enjoy!

NOTE: I hope to have built a robust and simple handshaking system. If you have one better in mind, please let me know!

**Be aware that DiteCross is not actively developed.**

That's it, enjoy! If you have questions / problems / whatsoever, feel free to open an issue here on GitHub or contact me via email (see my profile).
