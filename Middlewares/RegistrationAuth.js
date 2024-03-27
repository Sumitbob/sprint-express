const jwt = require('jsonwebtoken');
const { ValidationError } = require('./Handlers');

class RegistrationAuth {
	static async registration (req, res, next) {
		const token = req.headers.token;
		try {
			if (!token) {
				throw new ValidationError('No token provided');
			}
			jwt.verify(token, 'secret_key', (err) => {
				if (err) {
					throw new ValidationError('Invalid token');
				} else {
					next();
				}
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = RegistrationAuth;
