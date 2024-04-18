const CashfreeService = require('../Services/CashfreeService');

class Cashfree {
	static createPaymentOrder (req) {
		const { amount } = req.body;
		return CashfreeService.createPaymentOrder({ amount });
	}

	static createPaymentOrderCallback (req) {
		const data = req.body;
		CashfreeService.createPaymentOrderCallback(data);
	}
}

module.exports =Cashfree;