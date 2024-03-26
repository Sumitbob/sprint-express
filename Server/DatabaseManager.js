/* eslint-disable no-console */

const {Sequelize} = require('sequelize');
class Database {
	constructor() {
		const env = process.env.NODE_ENV || 'development';
		// const {
		//   NODE_ENV,
		//   DB_USERNAME,
		//   DB_PASSWORD,
		//   DB_DATABASE,
		//   DB_HOST,
		//   DB_DIALECT,
		// } = process.env;
		const username = 'root';
		const password = '';
		const database = 'billing';
		const host = 'localhost';
		const dialect = 'mysql';

		this.sequelize = new Sequelize(database, username, password, {
			host,
			dialect,
			logging: env === 'development',
		});
	}

	async initializeSQL() {
		try {
			await this.sequelize.authenticate();
			console.log(
				'Connection to the database has been established successfully.'
			);

			await this.sequelize.sync();
			console.log('Models synchronized with the database schema.');

			Object.defineProperty(global, 'sequelize', {
				value: this.sequelize,
				configurable: false,
				enumerable: true,
				writable: false,
			});
		} catch (error) {
			console.error('Error while synchronizing models:', error);
		}
	}
}

module.exports = Database;
