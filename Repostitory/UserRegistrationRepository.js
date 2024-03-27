const BaseRepository = require('./BaseRepository');
const { UserRegistration } = require('../Models');

class UserRegistrationRepository extends BaseRepository {
	constructor () {
		super(UserRegistration);
	}
}

module.exports = UserRegistrationRepository;
