const crypto = require('crypto');
const { ValidationError } = require('../Handlers/');

class CashfreeAuth {
	static webhookAuth (req, res, next) {
		const timestamp = req.headers['x-webhook-timestamp'];
		const signature = req.headers['x-webhook-signature'];
		const rawBody = req.rawBody;
		const secretKey = 'cfsk_ma_test_4e6f5087f6f89d31c2d82200f6fe99c4_c4189e6f';

		const body = timestamp + rawBody;
		const generatedSignature = crypto.createHmac('sha256', secretKey).update(body).digest('base64');
		if (generatedSignature === signature) {
			next();
		} else {
			throw new ValidationError('InvalidSignature');
		}
	}
}

module.exports = CashfreeAuth;
