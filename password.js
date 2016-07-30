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
"use strict"

var Password = function() {
	this.strings = [
		'Alpha','Bravo','Charlie','Delta','Echo','Foxtrot','Golf',
		'Hotel','India','Juliett','Kilo','Lima','Mike','November',
		'Oscar','Papa','Quebec','Romeo','Sierra','Tango','Uniform',
		'Victor','Whiskey','X-ray','Yankee','Zulu'
	]

	this.generate = function () {
		return this.getRandomWord() + '-' + this.getRandomWord() + '-' +
			this.getRandomWord()
	}

	this.getRandomWord = function () {
		return this.strings[this.randomInt(0, this.strings.length - 1)]
	}

	this.randomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

module.exports = Password