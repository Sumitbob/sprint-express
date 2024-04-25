const mysql = require('mysql2/promise');
const _ = require('lodash');
const config = require('../config/config');

class DatabaseManager {
	constructor () {
		// const env = process.env.NODE_ENV || 'development';
		const env = 'development';
		const { username, password, database, host } = config[env];

		this.readDbConfig = {
			host: host,
			user: username,
			password: password,
			database: database,
			waitForConnections: true,
			connectionLimit: 5,
			queueLimit: 0,
		};

		this.writeDbConfig = {
			host: host,
			user: username,
			password: password,
			database: database,
			waitForConnections: true,
			connectionLimit: 5,
			queueLimit: 0,
		};
	}

	async initializeSQL () {
		const [readDbPool, writeDbPool] = await Promise.all([
			mysql.createPool(this.readDbConfig),
			mysql.createPool(this.writeDbConfig)
		]);

		Object.defineProperty(global, 'readDb', {
			value: this.wrapPool(readDbPool),
			configurable: false,
			enumerable: true,
			writable: false,
		});

		Object.defineProperty(global, 'writeDb', {
			value: this.wrapPool(writeDbPool),
			configurable: false,
			enumerable: true,
			writable: false,
		});
	}

	wrapPool (pool) {
		const self = this;
		const originalQuery = pool.query.bind(pool);
		pool.query = async function (sql, values) {
			const convertedSql = self.convertQueryToSnakeCase(sql);
			// eslint-disable-next-line no-console
			if(process.env.NODE_ENV === 'development')  console.log(readDb.format(convertedSql, values));
			
			const [rows, fields] = await originalQuery(convertedSql, values);
			return Array.isArray(rows) ? [self.convertToCamelCase(rows), fields] : [rows, fields];
		};
		return pool;
	}

	convertQueryToSnakeCase (sql) {
		return sql.replace(/(?<!^)(?=[A-Z][a-z])/g, '_').toLowerCase();
	}


	convertToCamelCase (rows) {
		return rows.map(row => {
			const camelCaseRow = {};
			for (const key in row) {
				if (Object.prototype.hasOwnProperty.call(row, key)) {
					const camelCaseKey = _.camelCase(key);
					camelCaseRow[camelCaseKey] = row[key];
				}
			}
			return camelCaseRow;
		});
	}
}

module.exports = DatabaseManager;
