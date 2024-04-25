const { ValidationError } = require('../Middlewares/Handlers');
const PasswordEncoder = require('../utils/PasswordEncoder');
const RandomNumberGenerator = require('../utils/RandomNumberGenerator');
const SellerModel = require('../Models/SellerModel');

class SellerService {
	constructor () {
		this.randomNumberGenerator = new RandomNumberGenerator();
		this.passwordEncoder = new PasswordEncoder();
	}

	async signupOtp (contact) {
		
		// const otp = this.randomNumberGenerator.generate();
		const otp = 123456; 
		const otpToken = this.passwordEncoder.encode(`${contact}_${otp}`.toString());
		return { otpToken, otp };
	}

	async sellerSignUp (body) {
		const { name, email, password, contact, companyName, otpToken, otp } = body;

		const encryptedOtpToken = this.passwordEncoder.verify(otp, otpToken);

		if (!encryptedOtpToken) {
			throw new ValidationError('Please enter correct otp');
		}

		const sellerData = await SellerModel.findOne({
			contact
		});
		if(sellerData) {
			throw new ValidationError('Seller already exist'); 
		}
		const hashPassword = this.passwordEncoder.encode(password);

		await SellerModel.insert({
			contact,
			name,
			email,
			companyName,
			password : hashPassword
		});
		return true;
	}
}

module.exports = new SellerService();
