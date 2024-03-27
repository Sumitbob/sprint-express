const BaseRepository = require('./BaseRepository');
const { User } = require('../Models');

class AuthRepository extends BaseRepository {
	constructor () {
		super(User);
	}
}

module.exports = AuthRepository;
