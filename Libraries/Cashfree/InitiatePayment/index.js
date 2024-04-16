const Base = require('../Base');
const Validator = require('./Validator');

class InitiatePayment  extends Base {
	constructor () {
		super(Validator);
	}

	get serviceEndpoint () {
		return 'initiate_payment';
	}
    
	requestKeyMap () {
		return {
			customerDetails: 'customer_details',
			customerId:'customer_id',
			customerEmail: 'customer_email',
			customerPhone:'customer_phone',
			customerName:'customer_name',
			orderId:'order_id',
			orderAmount:'order_amount',
			orderCurrency:'order_currency',
		};
	}
}

module.exports = InitiatePayment;