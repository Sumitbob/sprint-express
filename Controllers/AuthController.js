const BaseController = require('./BaseController');
const AuthService = require('../Services/AuthService');

class AuthController extends BaseController {
	constructor (res, next) {
		super(res, next); // Pass res and next to the BaseController constructor
		this.service = new AuthService();
	}

	async sendRegistrationOtp (req) {
		const { mobile } = req.body;
		try {
			const user = await this.service.sendRegistrationOtp(mobile);
			this.sendSuccessResponse(user);
		} catch (error) {
			this.sendErrorResponse(error);
		}
	}

	async varifyRegistrationOtp (req) {
		const { mobile, otp } = req.body;
		const { token } = req.headers;
		try {
			const user = await this.service.varifyRegistrationOtp(mobile, otp, token);
			this.sendSuccessResponse(user);
		} catch (error) {
			this.sendErrorResponse(error);
		}
	}

	async registerUser (req) {
		const userData = req.body;
		try {
			const registration = await this.service.registerUser(userData);
			this.sendSuccessResponse(registration);
		} catch (error) {
			this.sendErrorResponse(error);
		}
	}
}

module.exports = AuthController;
