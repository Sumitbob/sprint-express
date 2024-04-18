const BaseModel = require('./BaseModel');

const tableName = 'sellers';

class SellerModel extends BaseModel {
	constructor () {
		super(tableName);
	}
}

module.exports = new  SellerModel();
