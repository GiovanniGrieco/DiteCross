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