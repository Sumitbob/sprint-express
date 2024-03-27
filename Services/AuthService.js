const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NotFoundError, ValidationError } = require('../Middlewares/Handlers');
const AuthRepository = require('../Repostitory/AuthRepository');
const UserRegistrationRepository = require('../Repostitory/UserRegistrationRepository');
const RandomNumberGenerator = require('../utils/RandomNumberGenerator');
const PasswordEncoder = require('../utils/PasswordEncoder');

class AuthService {
	constructor () {
		this.randomNumberGenerator = new RandomNumberGenerator();
		this.passwordEncoder = new PasswordEncoder();
	}

	async sendRegistrationOtp (mobileNumber) {
		try {
			await UserRegistrationRepository.findOrCreate({ mobile: mobileNumber });
			const otp = this.randomNumberGenerator.generate();
			const token = this.passwordEncoder.encode(`${mobileNumber}_${otp}`);
			return { token, otp };
		} catch (error) {
			throw new Error(error);
		}
	}

	async login (mobileNumber, password) {
		try {
			const user = await AuthRepository.findByMobileNumber(mobileNumber);
			if (!user) throw new NotFoundError('User not found');
			const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
			if (!isPasswordMatch) throw new ValidationError('Invalid credentials');
			const token = jwt.sign({ userId: user.id }, 'secret_key', {
				expiresIn: '1h',
			});
			return token;
		} catch (error) {
			throw new Error(`Error logging in: ${error.message}`);
		}
	}
}

module.exports = AuthService;
