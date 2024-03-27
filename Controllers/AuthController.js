const BaseController = require('./BaseController');
const AuthService = require('../Services/AuthService');

class AuthController extends BaseController {
	constructor (res, next) {
		super(res, next);
		this.authService = new AuthService();
	}

	async sendRegistrationOtp (req) {
		const { mobile } = req.body;
		try {
			const user = await this.authService.sendRegistrationOtp(mobile);
			this.sendSuccessResponse(user);
		} catch (error) {
			this.sendErrorResponse(error);
		}
	}

	async login (req) {
		const { email, password } = req.body;
		try {
			const token = await this.authService.login(email, password);
			this.sendSuccessResponse({ token });
		} catch (error) {
			this.sendErrorResponse(error);
		}
	}
}

module.exports = AuthController;
