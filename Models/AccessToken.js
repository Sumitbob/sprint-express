const BaseModel = require('./BaseModel');

const tableName = 'accessToken';

class AccessToken extends BaseModel {
	constructor () {
		super(tableName);
	}
}

module.exports = new AccessToken();