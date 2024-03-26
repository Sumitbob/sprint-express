const {ValidationError} = require('sequelize');

class DatabaseErrorHandler {
	static handle(error) {
		if (error instanceof ValidationError) {
			return error.errors.map((err) => err.message).join(', ');
		}
		return error.message || error;
	}
}

module.exports = DatabaseErrorHandler;
