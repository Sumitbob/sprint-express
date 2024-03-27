class ErrorHandler {
	// eslint-disable-next-line no-unused-vars
	static handle (err, req, res, next) {
		let statusCode = 500;
		let message = 'Internal Server Error';
		if (err.name === 'ValidationError') {
			statusCode = 400;
			message = err.message || 'Validation Error';
		} else if (err.name === 'UnauthorizedError') {
			statusCode = 401;
			message = err.message || 'Unauthorized';
		} else if (err.name === 'NotFoundError') {
			statusCode = 404;
			message = err.message || 'Not Found';
		}
		else if(err.name === 'TypeError') {
			statusCode = 500;
			message = 'Internal Server Error';
		}
		else {
			statusCode = 500;
			message = 'Internal Server Error';
		}
		res.status(statusCode).json({ success: false, message });
	}
}

module.exports = ErrorHandler;
