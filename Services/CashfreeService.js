const CashfreeLibrary = require('../Libraries/Cashfree');

class Cashfree {
	async createPaymentOrder ({ amount, customerId = '21313' }) {
		const { paymentSessionId } = await CashfreeLibrary.createPaymentOrder({ amount, customerId });
		return { sessionId  : paymentSessionId };
	}

	async createPaymentOrderCallback (cbData) {
		// eslint-disable-next-line no-console
		console.log('createPaymentOrderCallback', cbData);
	}
}

module.exports = new Cashfree();