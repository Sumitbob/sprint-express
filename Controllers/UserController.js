const UserService = require('../Services/UserService');

class AuthController {
	static async sendLoginOtp (req) {
		const { mobile } = req.body;
		return UserService.sendLoginOtp(mobile);

	}

	static async verifyLoginOtp (req) {
		const { mobile, otp } = req.body;
		const { token } = req.headers;
		return UserService.verifyRegistrationOtp(mobile, otp, token);

	}

}

module.exports = AuthController;
