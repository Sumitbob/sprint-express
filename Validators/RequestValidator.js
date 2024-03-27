const ValidationError = require('../Middlewares/Handlers/ValidationError');

class RequestValidator {
	constructor (schema) {
		this.schema = schema;
	}

	validate (req, res, next) {
		const { error, value } = this.schema.validate({
			body: req.body,
			query: req.query,
			headers: req.headers
		}, { stripUnknown: true });

		if (error) {
			next(new ValidationError(error.details[0].message));
			return;
		}

		req.body = value.body;
		req.query = value.query;
		req.headers = value.headers;

		next();
	}
}

module.exports = RequestValidator;
