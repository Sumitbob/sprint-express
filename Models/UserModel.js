const BaseModel = require('./BaseModel');

const tableName = 'users';

class UserModel extends BaseModel {
	constructor () {
		super(tableName);
	}
}

module.exports = new  UserModel();
