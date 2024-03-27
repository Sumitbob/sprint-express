class BaseController {
	constructor (res, next) {
		this.res = res;
		this.next = next;
	}

	sendSuccessResponse (data) {
		this.res.status(200).json({ success: true, data });
	}

	sendErrorResponse (error) {
		this.next(error);
	}
}

module.exports = BaseController;
