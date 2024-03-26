const BaseRepository = require('./BaseRepository');
const {User} = require('../Models');

class AuthRepository extends BaseRepository {
	constructor() {
		super(User);
	}

	async registerUser(data) {
		// try {
		const user = await this.create(data);
		return user;
		// } catch (error) {
		//   thr
		// }
	}

	async findByMobileNumber(mobileNumber) {
		try {
			const user = await this.findOne({where: {mobileNumber}});
			return user;
		} catch (error) {
			throw new Error('Error finding user by mobile number: ' + error.message);
		}
	}
}

module.exports = new AuthRepository();
