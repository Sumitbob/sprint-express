const BaseModel = require('./BaseModel');

const tableName = 'cashfreeRequestResponseLog';
class CashfreeRequestResponseLog extends BaseModel {
	constructor () {
		super(tableName);
	}
}
module.exports = new CashfreeRequestResponseLog();