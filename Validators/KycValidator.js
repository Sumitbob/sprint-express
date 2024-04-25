const Joi = require('joi');
const RequestValidator = require('./RequestValidator');

class KycValidator extends RequestValidator {
	constructor () {
		super(Joi.object({
			body: Joi.object({
				organizationType: Joi.string().required().messages({
					'any.required': 'Organization Type is required',
					'string.empty': 'Organization Type cannot be empty',
					'string.base': 'Organization Type must be a string'
				}),
				organizationName: Joi.string().required().messages({
					'any.required': 'Organization Name is required',
					'string.empty': 'Organization Name cannot be empty',
					'string.base': 'Organization Name must be a string'
				}),
				iecNo: Joi.string().required().messages({
					'any.required': 'Iec Number is required',
					'string.empty': 'Iec Number cannot be empty',
					'string.base': 'Iec Number must be a string'
				}),
				aDCode: Joi.string().required().messages({
					'any.required': 'AD Code is required',
					'string.empty': 'AD Code cannot be empty',
					'string.base': 'AD Code must be a string'
				}),
				aDCodeBankACNo: Joi.number().required().integer().messages({
					'any.required': 'AD Code Band A/C Number is required',
					'number.base': 'AD Code Band A/C Number must be a number',
					'number.integer': 'AD Code Band A/C Number must be an integer'
				}),
				aDCodeBankACName: Joi.string().required().messages({
					'any.required': 'AD Band A/C Name is required',
					'string.empty': 'AD Band A/C Name cannot be empty',
					'string.base': 'AD Band A/C Name must be a string'
				}),
				address1: Joi.string().required().messages({
					'any.required': 'Address is required',
					'string.empty': 'Address cannot be empty',
					'string.base': 'Address must be a string'
				}),
				address2: Joi.string().required().messages({
					'any.required': 'Address is required',
					'string.empty': 'Address cannot be empty',
					'string.base': 'Address must be a string'
				}),
				city: Joi.string().required().messages({
					'any.required': 'City is required',
					'string.empty': 'City cannot be empty',
					'string.base': 'City must be a string'
				}),
				state: Joi.string().required().messages({
					'any.required': 'State is required',
					'string.empty': 'State cannot be empty',
					'string.base': 'State must be a string'
				}),
				country: Joi.string().required().messages({
					'any.required': 'Country is required',
					'string.empty': 'Country cannot be empty',
					'string.base': 'Country must be a string'
				}),
				pincode: Joi.number().required().integer().messages({
					'any.required': 'Pincode is required',
					'number.base': 'Pincode must be a number',
					'number.integer': 'Pincode must be an integer'
				}),

				restrictedItems: Joi.string().valid('yes', 'no').required().messages({
					'any.required': 'Restricted items field is required',
					'string.empty': 'Restricted items field cannot be empty',
					'string.base': 'Restricted items field must be a string',
					'any.only': 'Restricted items must be either "yes" or "no"'
				}),
			}).required(),
			query: Joi.object().unknown(),
			headers: Joi.object().unknown()
		}).options({ allowUnknown: true }));
	}
}

class KycDocumentRequired extends RequestValidator {
	constructor () {
		super(Joi.object({
			body: Joi.object({
				organizationType: Joi.string().required().messages({
					'any.required': 'Organization Type is required',
					'string.empty': 'Organization Type cannot be empty',
					'string.base': 'Organization Type must be a string'
				}),
			}).required(),
			query: Joi.object().unknown(),
			headers: Joi.object().unknown()
		}).options({ allowUnknown: true }));
	}
}

module.exports = {
	KycValidator : new KycValidator(),
	KycDocumentRequired : new KycDocumentRequired()
};