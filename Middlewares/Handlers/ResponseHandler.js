class ResponseHandler {
	static handle (handler) {
		return async (req, res, next) => {
			try {
				const response = await handler(req);
				res.status(200).json(response); 
			} catch (error) {
				next(error); 
			}
		};
	}
}
  
module.exports = ResponseHandler;
  