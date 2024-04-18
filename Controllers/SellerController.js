const SellerService = require('../Services/SellerService');

class SellerController {
	static async signupOtp (req) {
		const { mobile } = req.body;
		return SellerService.signupOtp(mobile);
	}

	static async sellerSignUp (req) {
		const body = req.body;
		return SellerService.sellerSignUp(body);
	}

	static async verifyLoginOtp (req) {
		const { mobile, otp } = req.body;
		const { token } = req.headers;
		return SellerService.verifyRegistrationOtp(mobile, otp, token);
	}

}

module.exports = SellerController;
