const ErrorHandler = require('./ErrorHandler');
const NotFoundError = require('./NotFoundError');
const UnauthorizedError = require('./UnauthorizedError');
const ValidationError = require('./ValidationError');
const AlreadyExistError = require('./AlreadyExistError');

module.exports = {
	ErrorHandler,
	NotFoundError,
	UnauthorizedError,
	ValidationError,
	AlreadyExistError
};
