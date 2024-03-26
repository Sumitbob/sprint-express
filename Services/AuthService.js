const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
	NotFoundError,
	ValidationError,
} = require('../Middlewares/Handlers');
const AuthRepository = require('../Repostitory/AuthRepository');

class AuthService {
	static async register(mobileNumber, password) {
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await AuthRepository.registerUser({
				mobileNumber,
				passwordHash: hashedPassword,
			});
			return user;
		} catch (error) {
			throw new Error(error);
		}
	}
  
	static async login(mobileNumber, password) {
		try {
			const user = await AuthRepository.findByMobileNumber(mobileNumber);
			if (!user) throw new NotFoundError('User not found');
			const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
			if (!isPasswordMatch) throw new ValidationError('Invalid credentials');
			const token = jwt.sign({userId: user.id}, 'secret_key', {
				expiresIn: '1h',
			});
			return token;
		} catch (error) {
			throw new Error(`Error logging in: ${error.message}`);
		}
	}
}

module.exports = AuthService;
