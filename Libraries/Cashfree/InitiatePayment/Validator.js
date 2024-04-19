const Joi = require('joi');

class Validator {
	constructor (data) {
		this.data = data;
		this.schema = Joi.object({
			customerDetails: Joi.object({
				customerId: Joi.string().alphanum().min(3).max(100).required(),
				customerEmail: Joi.string().email().min(3).max(100).required(),
				customerPhone: Joi.string().pattern(/^[0-9]+$/).length(10).required(),
				customerName: Joi.string().min(3).max(100).required()
			}).required(),
			orderId: Joi.string().min(3).max(100).required(),
			orderAmount: Joi.number().positive().required(),
			orderCurrency: Joi.string().min(3).max(5).required(),
			orderMeta : Joi.object({
				notifyUrl : Joi.string().uri().required(),
				returnUrl : Joi.string().uri().required()
			}).required()
		});
	}

	validate () {
		return this.schema.validate(this.data);
	}
}

module.exports = Validator;
