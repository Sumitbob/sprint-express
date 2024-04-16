const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../Middlewares/Handlers');
const RandomNumberGenerator = require('../utils/RandomNumberGenerator');
const PasswordEncoder = require('../utils/PasswordEncoder');
const UserModel = require('../Models/UserModel');

class UserService {
	constructor () {
		this.randomNumberGenerator = new RandomNumberGenerator();
		this.passwordEncoder = new PasswordEncoder();
	}

	async sendLoginOtp (mobileNumber) {

		const user = await UserModel.findOne({
			mobile : mobileNumber,
			firstName: 'Paramanand',
			lastName: 'Balara'
		});
		// await UserModel.insert({
		// 	mobile : 7239887408,
		// 	firstName: 'Paramanand',
		// 	lastName: 'Balara'
		// });  // for insert

		// await UserModel.update(1000000000015, { firstName: 'Sandeep',
		// 	lastName: 'Balara' }); for update
		
		if (!user) {
			throw new NotFoundError('User not found');
		}
		const otp = this.randomNumberGenerator.generate();
		const token = this.passwordEncoder.encode(`${mobileNumber}_${otp}`);
		return { token, otp };
	}

	generateAuthToken (userId) {
		const token = jwt.sign({ userId }, 'secret_key', {
			expiresIn: '5m',
		});
		return token;
	}
}

module.exports = new UserService();
