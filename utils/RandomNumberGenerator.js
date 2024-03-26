'use strict';

class RandomNumberGenerator {
	constructor(length = 6) {
		this.length = length;
	}

	generate() {
		const min = Math.pow(10, this.length - 1);
		const max = Math.pow(10, this.length) - 1;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

module.exports = RandomNumberGenerator;
