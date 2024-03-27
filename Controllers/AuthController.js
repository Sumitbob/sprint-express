const AuthService = require('../Services/AuthService');

class AuthController {
	async sendRegistrationOtp (req) {
		const { mobile } = req.body;
		return AuthService.sendRegistrationOtp(mobile);
		
	}

	async verifyRegistrationOtp (req) {
		const { mobile, otp } = req.body;
		const { token } = req.headers;
		return AuthService.verifyRegistrationOtp(mobile, otp, token);
		
	}

	async registerUser (req) {
		const userData = req.body;
		return AuthService.registerUser(userData);
		
	}
}

module.exports = new AuthController();
