const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../Middlewares/Handlers');
const AuthRepository = require('../Repostitory/AuthRepository');
const UserRegistrationRepository = require('../Repostitory/UserRegistrationRepository');
const RandomNumberGenerator = require('../utils/RandomNumberGenerator');
const PasswordEncoder = require('../utils/PasswordEncoder');

class AuthService {
	constructor () {
		this.model = new AuthRepository();
		this.randomNumberGenerator = new RandomNumberGenerator();
		this.passwordEncoder = new PasswordEncoder();
		this.userRegistrationRepository = new UserRegistrationRepository();
	}

	async sendRegistrationOtp (mobileNumber) {
		try {
			await this.model.findOrCreate({ mobile: mobileNumber });
			const otp = this.randomNumberGenerator.generate();
			const token = this.passwordEncoder.encode(`${mobileNumber}_${otp}`);
			return { token, otp };
		} catch (error) {
			throw new Error(error);
		}
	}

	async login (mobile) {
		try {
			const user = await this.model.findOne({ mobile });
			if (!user) {
				throw new NotFoundError('User not found');
			}
			return this.generateAuthToken(user.id);
		} catch (error) {
			throw new Error(`Error logging in: ${error.message}`);
		}
	}

	generateAuthToken (userId) {
		const token = jwt.sign({ userId }, 'secret_key', {
			expiresIn: '1h',
		});
		return token;
	}
}

module.exports = AuthService;
