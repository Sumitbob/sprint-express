const InitiatePayment = require('./InitiatePayment');
const CashfreeRequestResponseLog = require('../../Models/CashfreeRequestResponseLogModel');
const CashfreeStepEnum = {
	'INITIATE_PAYMENT': 'INITIATE_PAYMENT'
};


class Cashfree {

	async createPaymentOrder ({ customerId = '21313', amount }) {
		//just for test
		const min = Math.pow(10, 6 - 1);
		const max = Math.pow(10, 6) - 1;
		const randomOrd =  Math.floor(Math.random() * (max - min + 1)) + min;
		const data = {
			customerDetails: {
				customerId,
				customerEmail: 'paramanand982@gmail.com',
				customerPhone: '7239887406',
				customerName: 'Paramanand'
			},
			orderId: 'test-ord-'+ randomOrd,
			orderAmount: amount,
		};
		try {
			const initiatePayment = new InitiatePayment();
			const { response, rawResponse, rawRequest } = await initiatePayment.call(data);
			await CashfreeRequestResponseLog.insert({ customerId, response : JSON.stringify(response), rawResponse : JSON.stringify(rawResponse), rawRequest: JSON.stringify(rawRequest), request: JSON.stringify(data), step: CashfreeStepEnum['INITIATE_PAYMENT'], success: true });
			return response;
		} catch (error) {
			await CashfreeRequestResponseLog.insert({ customerId, request: JSON.stringify(data), step: 1, success: false, error :  JSON.stringify(error) });
			throw  new Error(error);
		}

	}
}
module.exports = new Cashfree();