class ErrorHandler {
	// eslint-disable-next-line no-unused-vars
	static handle (err, req, res, next) {
		// eslint-disable-next-line no-console
		console.error(err);
		let statusCode = 500;
		let message = 'Internal Server Error';
		let logout;
		if (err.name === 'ValidationError') {
			statusCode = 400;
			message = err.message || 'Validation Error';
		} else if (err.name === 'UnauthorizedError') {
			statusCode = 401;
			message = err.message || 'Unauthorized';
			logout = true;
		} else if (err.name === 'NotFoundError') {
			statusCode = 404;
			message = err.message || 'Not Found';
		}
		else if(err.name === 'TypeError') {
			statusCode = 500;
			message = 'Internal Server Error';
		}
		else if(err.name === 'AlreadyExistError') {
			statusCode = 404,
			message = err.message || 'Already Exist';
		}
		else {
			statusCode = 500;
			message = 'Internal Server Error';
		}
		res.status(statusCode).json({ success: false, message, logout });
	}
}

module.exports = ErrorHandler;
