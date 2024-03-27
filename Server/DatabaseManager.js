/* eslint-disable no-console */

const { Sequelize } = require('sequelize');
const config = require('../config/config');
class Database {
	constructor () {
		const env = process.env.NODE_ENV || 'development';
		const { username, password, database, host, dialect, underscored } = config[env];

		this.sequelize = new Sequelize(database, username, password, {
			host,
			dialect,
			underscored,
			logging: env === 'development',
		});
	}

	async initializeSQL () {
		try {
			await this.sequelize.authenticate();
			console.log('Connection to the database has been established successfully.');

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
