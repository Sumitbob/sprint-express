const BaseController= require('./BaseController');
const  AuthService = require('../Services/AuthService');

class AuthController extends BaseController {
	constructor(res, next) {
		super(res, next);
	}

	async register(req) {
		const {mobileNumber, password} = req.body;
		try {
			const user = await AuthService.register(mobileNumber, password);
			this.sendSuccessResponse(user);
		} catch (error) {
			this.sendErrorResponse(error);
		}
	}

	async login(req) {
		const {email, password} = req.body;
		try {
			const token = await AuthService.login(email, password);
			this.sendSuccessResponse({token});
		} catch (error) {
			this.sendErrorResponse(error);
		}
	}
}

module.exports = AuthController;
