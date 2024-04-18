const Joi = require('joi');
const RequestValidator = require('./RequestValidator');

class SellerSignUpValidator extends RequestValidator {
	constructor () {
		super(Joi.object({
			body: Joi.object({
				contact: Joi.number().integer()
					.integer()
					.required()
					.min(1000000000) // Minimum 10-digit number
					.max(9999999999) // Maximum 10-digit number
					.messages({
						'any.required': 'Contact number is required',
						'number.empty': 'Contact number cannot be empty',
						'number.base': 'Contact number must be a number',
						'number.min': 'Contact number must be a 10-digit number',
						'number.max': 'Contact number must be a 10-digit number'
					}),
				name: Joi.string().required().min(6).max(20).messages({
					'any.required': 'Name is required',
					'string.empty': 'Name cannot be empty',
					'string.base': 'Name must be a string'
				}),
				email: Joi.string().email().required().min(5).messages({
					'any.required': 'Email is required',
					'string.empty': 'Email cannot be empty',
					'string.base': 'Email must be a string'
				}),
				password: Joi.string().required().min(5).max(30).messages({
					'any.required': 'Password is required',
					'string.empty': 'Password cannot be empty',
					'string.base': 'Password must be a string'
				}),
				otpToken: Joi.string().required().messages({
					'any.required': 'Otp token is required',
					'string.empty': 'Otp token cannot be empty',
				}),
				otp: Joi.number().required().integer().min(100000).max(999999).messages({
					'any.required': 'OTP is required',
					'number.base': 'OTP must be a number',
					'number.integer': 'OTP must be an integer',
					'number.min': 'OTP must be exactly 6 digits long',
					'number.max': 'OTP must be exactly 6 digits long'
				}),
				companyName: Joi.string()
			}).required(),
			query: Joi.object().unknown(),
			headers: Joi.object().unknown()
		}).options({ allowUnknown: true }));
	}
}

module.exports = {
	sellerSignUpValidator : new SellerSignUpValidator()
};