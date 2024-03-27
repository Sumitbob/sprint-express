const jwt = require('jsonwebtoken');
const { NotFoundError, ValidationError } = require('../Middlewares/Handlers');
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
		const user = await this.userRegistrationRepository.findOrCreate({ mobile: mobileNumber });
		if (user.verified) {
			throw ValidationError('User already registered');
		}
		const otp = this.randomNumberGenerator.generate();
		const token = this.passwordEncoder.encode(`${mobileNumber}_${otp}`);
		return { token, otp };
	}

	async verifyRegistrationOtp (mobileNumber, otp, token) {
		const user = await this.userRegistrationRepository.findOne({ mobile: mobileNumber });
		if (!user) {
			throw new NotFoundError('User not found');
		}
		const verified = this.passwordEncoder.verify(`${mobileNumber}_${otp}`, token);
		if (!verified) {
			throw new ValidationError('Invalid Otp');
		}
		const varifyToken = this.generateAuthToken(user.id);
		return { token: varifyToken };
	}

	async registerUser (userData) {
		const { mobile } = userData;
		const user = await this.model.findOne({ mobile });
		if (user) {
			throw new ValidationError('User already exists');
		}
		const userRegister = await this.model.create(userData);
		const token = this.generateAuthToken(userRegister.id);
		await this.userRegistrationRepository.update(mobile, { verified: true });
		return { token };
	}

	generateAuthToken (userId) {
		const token = jwt.sign({ userId }, 'secret_key', {
			expiresIn: '5m',
		});
		return token;
	}
}

module.exports = new AuthService();
