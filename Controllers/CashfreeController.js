const CashfreeService = require('../Services/CashfreeService');

class Cashfree {
	static createPaymentOrder (req) {
		const { amount } = req.body;
		return CashfreeService.createPaymentOrder({ amount });
	}

	static createPaymentOrderCallback (req) {
		const body = req.body;
		CashfreeService.createPaymentOrderCallback(body);
	}
}

module.exports =Cashfree;