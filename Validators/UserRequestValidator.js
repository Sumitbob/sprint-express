const Joi = require('joi');
const RequestValidator = require('./RequestValidator');

class OtpValidator extends RequestValidator {
	constructor () {
		super(Joi.object({
			body: Joi.object({}).required(),
			query: Joi.object({}).unknown(),
			headers: Joi.object({}).unknown()
		}).options({ allowUnknown: false }));
	}
}

class RegistrationValidator extends RequestValidator {
	constructor () {
		super(Joi.object({
			body: Joi.object({
				mobile: Joi.string().required().messages({
					'any.required': 'Mobile number is required',
					'string.empty': 'Mobile number cannot be empty',
					'string.base': 'Mobile number must be a string'
				}),
				firstName: Joi.string().required().messages({
					'any.required': 'First name is required',
					'string.empty': 'First name cannot be empty',
					'string.base': 'First name must be a string'
				}),
				lastName: Joi.string().required().messages({
					'any.required': 'Last name is required',
					'string.empty': 'Last name cannot be empty',
					'string.base': 'Last name must be a string'
				}),
				roleId: Joi.number().required().messages({
					'any.required': 'Role ID is required',
					'number.base': 'Role ID must be a number'
				})
			}).required(),
			query: Joi.object().unknown(),
			headers: Joi.object().unknown()
		}).options({ allowUnknown: true }));
	}
}

class SendLoginOtpValidator extends RequestValidator {
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
					})
			}).required(),
			query: Joi.object().unknown(),
			headers: Joi.object().unknown()
		}).options({ allowUnknown: true }));
	}
}

module.exports = {
	otpValidator : new OtpValidator(),
	registrationValidator : new RegistrationValidator(),
	sendLoginOtpValidator : new SendLoginOtpValidator()
};
