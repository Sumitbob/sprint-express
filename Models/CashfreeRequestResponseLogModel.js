const BaseModel = require('./BaseModel');

const tableName = 'cashFreeRequestResponseLog';
class CashfreeRequestResponseLog extends BaseModel {
	constructor () {
		super(tableName);
	}
}
module.exports = new CashfreeRequestResponseLog();