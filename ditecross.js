console.log("DiteCross - Made by corsaro");

const fs = require('fs');

const TelegramBot = require('node-telegram-bot-api');
const Discord = require("discord.js");
const discord_ditecross = new Discord.Client();
var telegram_ditecross = undefined;

var discord_ditecross_serverid = '';
var telegram_ditecross_serverid = '';

discord_ditecross.on("message", function(message)
{
	//console.log('[' + message.author.username + '@' + message.server.name + '|Discord]> ' + message.content);
	discord_ditecross_serverid = message.channel.id;
	if (message.author.username !== "DiteCross")
		discord_relay_to_telegram(message.author.username, message.server.name, message.content);
});

discord_login_via_file();
telegram_login_via_file();

function discord_login_via_file() {
	var fields = fs.readFileSync('discord.ini').toString().split('\n');
	if (fields[0] == "[token]") {
		discord_ditecross.loginWithToken(fields[1]).then(discord_loginSuccess).catch(loginError);
	} else {
		loginError('Discord token not found in file');
	}
}

function discord_loginSuccess(token)
{
	console.log('[Discord] Login successful');
	fs.writeFile('discord.ini', '[token]\n' + token, (error) => {
		if (error)
			console.log('[Discord] Error saving token to file.');
	});
}

function discord_relay_to_telegram(username, serverName, content) {
	if (telegram_ditecross_serverid) {
		message = '[' + username + '@' + serverName + ']> ' + content
		telegram_ditecross.sendMessage(telegram_ditecross_serverid, message);
		console.log('[Discord>>Telegram] Message sent');
	}
}

function loginError(error)
{
	console.log('Error: ' + error);
	console.log('Abort');
	process.exit(1);
}

function telegram_login_via_file() {
	var fields = fs.readFileSync('telegram.ini').toString().split('\n');
	if (fields[0] == "[token]") {
		telegram_initialise(fields[1]);
	} else {
		loginError('Telegram token not found in file');
	}
}

function telegram_initialise(token) {
	telegram_ditecross = new TelegramBot(token, {polling: true});

	console.log('[Telegram] Login successful');

	telegram_ditecross.on('message', function(message) {
		//console.log('[' + message.from.username + "@" + message.chat.title + '|Telegram]> ' + message.text);
		telegram_ditecross_serverid = message.chat.id;
		telegram_relay_to_discord(message.from.username, message.chat.title, message.text);
	});
}

function telegram_relay_to_discord(username, serverName, content) {
	if (discord_ditecross_serverid) {
		message = '[' + username + '@' + serverName + ']> ' + content;
		discord_ditecross.sendMessage(discord_ditecross_serverid, message).then(function (message) {
			console.log('[Telegram>>Discord] Message sent');
		}).catch(function (error) {
			console.log('[Telegram>>Discord] Message error');
		});
	}
}
