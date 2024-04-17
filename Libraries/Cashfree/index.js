const InitiatePayment = require('./InitiatePayment');
const CashfreeRequestResponseLog = require('../../Models/CashfreeRequestResponseLogModel');
const CashfreeStepEnum = {
	'INITIATE_PAYMENT': 'INITIATE_PAYMENT'
};


class Cashfree {

	async createPaymentOrder (customerId = '21313') {
		const data = {
			customerDetails: {
				customerId,
				customerEmail: 'paramanand982@gmail.com',
				customerPhone: '7239887406',
				customerName: 'Paramanand'
			},
			orderId: 'test-ord-28',
			orderAmount: 10,
		};
		try {
			const initiatePayment = new InitiatePayment();
			const { response, rawResponse, rawRequest } = await initiatePayment.call(data);
			await CashfreeRequestResponseLog.insert({ customerId, response : JSON.stringify(response), rawResponse : JSON.stringify(rawResponse), rawRequest: JSON.stringify(rawRequest), request: JSON.stringify(data), step: CashfreeStepEnum['INITIATE_PAYMENT'], success: true });
			return response;
		} catch (error) {
			await CashfreeRequestResponseLog.insert({ customerId, request: JSON.stringify(data), step: 1, success: false, error :  JSON.stringify(error) });

		}

	}
}
module.exports = new Cashfree();





// const DatabaseManager = require('../../Server/DatabaseManager');


// (async () => {
// 	try {
// 		await new DatabaseManager('development').initializeSQL();
// 		await new Cashfree().createPaymentOrder();
// 		process.exit(1);

// 	} catch (error) {
// 		// eslint-disable-next-line no-console
// 		console.error('Error initializing application:', error);
// 		process.exit(1);
// 	}
// })();