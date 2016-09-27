/*
DiteCross - Discord-Telegram Cross messaging system
Copyright (C) 2015 Giovanni Grieco

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
console.log("DiteCross\tCopyright (C) 2015  Giovanni Grieco")
/*
 * GLOBAL DEPENDENCIES
 */
const fs = require('fs')

/*
 * BASIC FUNCTIONS AND UTILITIES
 */
function read_token(fileName) {
	var lines = fs.readFileSync(fileName).toString().split('\n')
	if (lines[0] === "[token]" && lines[1] != undefined)
		return lines[1]
	else
		throwError("ERROR: Token not found in file " + fileName)
}

function throwError(error) {
	console.error(error)
	process.exit(1)
}

/*
 * INIT
 */
init()
function init() {
	const DISCORD_TOKEN  = read_token('discord.ini')
	const TELEGRAM_TOKEN = read_token('telegram.ini')

	var Bot = new DiteCross(DISCORD_TOKEN, TELEGRAM_TOKEN)

	process.on('SIGTERM', gracefulExit).on('SIGINT', gracefulExit).on('SIGHUP', gracefulExit)

	function gracefulExit() {
		Bot.saveCrossTable()
		Bot.logout()
		process.exit()
	}
}

/*
 * DITECROSS
 */
function DiteCross(Discord_Token, Telegram_Token) {
	/*
	 * DISCORD
	 */
	this.Discord_initialise = function (token) {
		this.Discord_Bot = new this.Discord_API.Client({token: token, autorun: true})
		this.Discord_Bot.on('message', (user, userID, channelID, message, event) => this.Discord_messagePoll(user, userID, channelID, message, event))
		this.Discord_Bot.on('disconnect', (error, code) => this.Discord_reconnect(error, code))
	}

	this.Discord_messagePoll = function (user, userID, channelID, message, event) {
		if (message.charAt(0) === '/')
			this.Discord_manageCommand(userID, channelID, message)
		else
			this.Discord_manageMessage(userID, channelID, message)
	}

	this.Discord_manageCommand = function (userID, channelID, message) {
		if (message.startsWith('handshake', 1)) {
			var regPsw = /^\/handshake\s([A-Z]\-?[a-z]+\-[A-Z]\-?[a-z]+\-[A-Z]\-?[a-z]+)/g
			var password = regPsw.exec(message)
			this.Discord_processHandshake(userID, channelID, password)
		} else if (message.startsWith('help', 1)) {
			var ret = 'I relay your message for you on Telegram or help you know what happens there directly here\n' +
				'\nRemember to start the handshake on Telegram. If you had done it, type /handshake here to finish.\n' +
				'You can read some bits of information about me by typing /about'
			var to = channelID ? channelID : userID
			this.Discord_Bot.sendMessage({to: to, message: ret})
		} else if (message.startsWith('about', 1)) {
			var ret = 'DiteCross - Discord-Telegram Cross messaging system\n' +
				'Developed by Giovanni Grieco\n' +
				'\nI\'m open source! :D\n' +
				'https://github.com/corsaroquad/DiteCross'
			var to = channelID ? channelID : userID
			this.Discord_Bot.sendMessage({to: to, message: ret})
		} else {
			if (!channelID) {
				var ret = 'Sorry, what did you say?'
				this.Discord_Bot.sendMessage({to: userID, message: ret})
			}
		}
	}

	this.Discord_processHandshake = function (userID, channelID, password) {
		var resp = false;
		this.Discord_handshakeRequests.forEach(function (current, index) {
			if (
				current[1] === this.Discord_Bot.channels[channelID].name &&
				this.Discord_Bot.channels[channelID].type === 'text' &&
				current[0] === this.Discord_Bot.servers[this.Discord_Bot.channels[channelID].guild_id].name &&
				!resp
			) {
				if (password)
					if ( // XNOR = A * B + !A * !B for Password
						(
							current[4] != undefined &&
							current[4] === password[1]
						) ||
						(
							!(current[4] != undefined) &&
							!(current[4] === password[1])
						)
					) {
						this.CrossTable.push({
							'telegram_chat_id': current[2],
							'discord_channel_id': channelID
						})
						var ret = 'Handshaked with Telegram!'
						this.Discord_Bot.sendMessage({to: channelID, message: ret})
						ret = 'Handshaked with Discord!'
						this.Telegram_Bot.sendMessage(current[2], ret)
						resp = true
					}
			}
		}, this)
		if (!resp)
			this.Discord_Bot.sendMessage({to: channelID, message: 'Sorry, I don\'t have hands to shake or the password is wrong'})
	}

	this.Discord_manageMessage = function (userID, channelID, message) {
		this.CrossTable.forEach(function (current, index) {
			if (channelID === current['discord_channel_id'] && userID !== this.Discord_Bot.id) {
				var ret = this.Discord_Bot.users[userID].username + '#' + this.Discord_Bot.channels[channelID].name + ': ' + message
				this.Telegram_Bot.sendMessage(current['telegram_chat_id'], ret)
			}
		}, this)
	}

	this.Discord_reconnect = function (error, code) {
		this.Discord_Bot.connect()
	}

	this.Discord_API = require('discord.io')
	this.Discord_Bot = undefined
	this.Discord_handshakeRequests = []
	this.Discord_initialise(Discord_Token)

	/*
	 * TELEGRAM
	 */
	this.Telegram_initialise = function (token) {
		this.Telegram_Bot = new this.Telegram_API(token, {polling: true})
		this.Telegram_Bot.onText(/@(.+)#([A-Za-z0-9\_\-]+)/, (message, reg) => this.Telegram_processHandshake(message, reg))
		this.Telegram_Bot.on('message', (message) => this.Telegram_messagePoll(message))
	}

	this.Telegram_messagePoll = function (message) {
		if (message.text) {
			if (message.text.charAt(0) === '/')
				this.Telegram_manageCommand(message)
			else
				this.Telegram_manageMessage(message)
		}
	}

	this.Telegram_manageCommand = function (message) {
		if (message.text.startsWith('handshake', 1)) {
			var ret = 'What is the server and the channel you want to handshake?\n' +
				'Please type them as @servername#channelname'
			this.Telegram_Bot.sendMessage(message.chat.id, ret)
			var password = new this.Password()
			this.Telegram_handshakeRequests.push([message.chat.id, message.from.id, message.date, password.generate()])
		} else if (message.text.startsWith('cancel', 1)) {
			this.Telegram_cancelHandshake(message.chat.id)
		} else if (message.text.startsWith('help', 1) || message.text.startsWith('start', 1)) {
			var ret = 'I relay your messages for you on Discord or help you know what happens there directly here\n' +
				'\nYou can control me by sending these commands:\n' +
				'\n/handshake - Associate this chat with a Discord channel\n' +
				'\n/cancel - Cancel Handshake request or current association\n' +
				'/about - About me and my creator\n' +
				'/help - Get this help message\n' +
				'/start - Alias of help'
			this.Telegram_Bot.sendMessage(message.chat.id, ret)
		} else if (message.text.startsWith('about', 1)) {
			var ret = 'DiteCross - Discord-Telegram Cross messaging system\n' +
				'Developed by Giovanni Grieco - @corsaro\n' +
				'\nI\'m open source! :D\n' +
				'https://github.com/corsaroquad/DiteCross'
			this.Telegram_Bot.sendMessage(message.chat.id, ret)
		} else {
			var ret = 'Sorry, what did you say?'
			this.Telegram_Bot.sendMessage(message.chat.id, ret)
		}
	}

	this.Telegram_processHandshake = function (request, regexpExec) {
		// check if user made /handshake firstly
		var remove_entries = [], padding = 0
		var resp = false
		var password = ''
		this.Telegram_handshakeRequests.forEach(function (current, index) {
			if (request.chat.id === current[0] && request.from.id === current[1] && !resp) {
				resp = true;
				password = current[3]
				remove_entries.push(index)
			} else if ((request.chat.id === current[0] || request.from.id === current[1]) && resp) {
				remove_entries.push(index)
			}
		})
		remove_entries.forEach(function (current) {
			this.Telegram_handshakeRequests.splice(current - padding, 1)
			padding++
		}, this)

		if (resp) {
			var ret = 'Please, type on that channel the following command:\n' +
				'/handshake ' + password + '\n' +
				'or type /cancel here if you change your mind'
			this.Telegram_Bot.sendMessage(request.chat.id, ret)

			this.Discord_handshakeRequests.push([regexpExec[1], regexpExec[2], request.chat.id, request.date, password])
		}
	}

	this.Telegram_cancelHandshake = function (chatID) {
		var remove_entries = [], padding = 0
		var resp = false
		this.Discord_handshakeRequests.forEach(function (current, index) {
			if (chatID === current[2]) {
				resp = true
				remove_entries.push(index)
			}
		})
		remove_entries.forEach(function (current) {
			this.Discord_handshakeRequests.splice(current - padding, 1)
			padding++
		}, this)

		remove_entries = []
		padding = 0
		this.Telegram_handshakeRequests.forEach(function (current, index) {
			if (chatID === current[0]) {
				resp = true
				remove_entries.push(index)
			}
		})
		remove_entries.forEach(function (current) {
			this.Discord_handshakeRequests.splice(current - padding, 1)
			padding++
		}, this)

		remove_entries = []
		padding = 0
		this.CrossTable.forEach(function (current, index) {
			if (chatID === current['telegram_chat_id']) {
				resp = true
				remove_entries.push(index)
			}
		})
		remove_entries.forEach(function (current) {
			this.CrossTable.splice(current - padding, 1)
			padding++
		}, this)

		var ret = ''
		if (resp) {
			ret = 'Handshake cancelled'
		} else {
			ret = 'Nothing to cancel'
		}

		this.Telegram_Bot.sendMessage(chatID, ret)
	}

	this.Telegram_manageMessage = function (message) {
		this.CrossTable.forEach(function (current, index) {
			if (message.chat.id === current['telegram_chat_id']) {
				var ret = message.from.username + '@' + message.chat.title + ': ' + message.text
				this.Discord_Bot.sendMessage({to: current['discord_channel_id'], message: ret})
			}
		}, this)
	}

	this.Telegram_API = require('node-telegram-bot-api')
	this.Telegram_Bot = undefined
	this.Telegram_handshakeRequests = [];
	this.Telegram_initialise(Telegram_Token);

	this.readCrossTable = function () {
		var table = []
		try {
			table = JSON.parse(fs.readFileSync('crosstable.json', 'utf-8'))
		} catch(error) {}
		return table
	}

	this.saveCrossTable = function () {
		fs.writeFileSync('crosstable.json', JSON.stringify(this.CrossTable), 'utf-8')
	}

	this.CrossTable = this.readCrossTable()

	this.logout = function() {
		this.Discord_Bot.disconnect()
	}

	this.Password = require('./password.js')
}
