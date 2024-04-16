const InitiatePayment = require('./InitiatePayment');
const CashfreeRequestResponseLog = require('../../Models/CashfreeRequestResponseLogModel');
const CashfreeStepEnum = {
	'INITIATE_PAYMENT': 'INITIATE_PAYMENT'
};


class Cashfree {

	async createPaymentOrder (data) {
		try {
			// const data = {
			//     customerDetails: {
			//         customerId: '7112AAA812236',
			//         customerEmail: 'paramanand982@gmail.com',
			//         customerPhone: '7239887406',
			//         customerName: 'Paramanand'
			//     },
			//     orderId: 'test-ord-2',
			//     orderAmount: 10,
			//     orderCurrency: 'INR'
			// };
			const initiatePayment = new InitiatePayment();

			const { response, rawResponse, rawRequest } = await initiatePayment.call(data);
			await CashfreeRequestResponseLog.insert({ response, rawResponse, rawRequest, request: data, step: CashfreeStepEnum['INITIATE_PAYMENT'], sucess: true });
			return response;
		} catch (error) {
			await CashfreeRequestResponseLog.insert({ request: data, step: CashfreeStepEnum['INITIATE_PAYMENT'], sucess: false });

		}

	}
}
const data = {
	customerDetails: {
		customerId: '7112AAA812236',
		customerEmail: 'paramanand982@gmail.com',
		customerPhone: '7239887406',
		customerName: 'Paramanand'
	},
	orderId: 'test-ord-11',
	orderAmount: 10,
	orderCurrency: 'INR'
};
new Cashfree().createPaymentOrder(data);
// module.exports = new Cashfree();