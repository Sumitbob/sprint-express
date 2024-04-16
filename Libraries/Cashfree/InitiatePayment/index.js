const Base = require('../Base');
const Validator = require('./Validator');

class InitiatePayment extends Base {
	constructor () {
		super(Validator);
	}

	get serviceEndpoint () {
		return 'orders';
	}

	requestKeyMap () {
		return {
			customerDetails: 'customer_details',
			customerId: 'customer_id',
			customerEmail: 'customer_email',
			customerPhone: 'customer_phone',
			customerName: 'customer_name',
			orderId: 'order_id',
			orderAmount: 'order_amount',
			orderCurrency: 'order_currency',
		};
	}

	responseKeyMap () {
		return {
			'cart_details':'cartDetails',
			'cf_order_id':'cfOrderId',
			'created_at':'createdAt',
			'customer_details':'customerDetails',
			'customer_id':'customerId',
			'customer_name':'customerName',
			'customer_email':'customerEmail',
			'customer_phone':'customerPhone',
			'customer_uid':'customerUid',
			'entity':'entity',
			'order_amount':'orderAmount',
			'order_currency':'orderCurrency',
			'order_expiry_time':'orderExpiryTime',
			'order_id':'orderId',
			'order_meta':'orderMeta',
			'return_url':'returnUrl',
			'notify_url':'notifyUrl',
			'payment_methods':'paymentMethods',
			'order_note':'orderNote',
			'order_splits':'orderSplits',
			'order_status':'orderStatus',
			'order_tags':'orderTags',
			'payment_session_id':'paymentSessionId',
			'terminal_data':'terminalData'
		};


	}
}

module.exports = InitiatePayment;