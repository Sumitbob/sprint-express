'use strict';

const crypto = require('crypto');
const RandomNumberGenerator = require('./RandomNumberGenerator');

class PasswordEncoder {
	constructor(iterations = 24000, keylen = 32, digest = 'sha256') {
		this.iterations = iterations;
		this.keylen = keylen;
		this.digest = digest;
		this.randomStringGenerator = new RandomNumberGenerator();
	}

	encode(secret, salt) {
		if (!salt) salt = this.randomStringGenerator.generate().toString();
		const key = crypto.pbkdf2Sync(secret, salt, this.iterations, this.keylen, this.digest);
		const decoded = key.toString('base64');
		return `pbkdf2_sha256$${this.iterations}$${salt}$${decoded}`;
	}

	verify(secret, encoded) {
		const parts = encoded.split('$');
		const salt = parts[2];
		const userEncoded = this.encode(secret, salt);
		return userEncoded === encoded;
	}
}

module.exports = PasswordEncoder;
