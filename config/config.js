module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		host: process.env.HOST,
		dialect: 'mysql',
		underscored: true,
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		host: process.env.HOST,
		dialect: 'mysql',
		underscored: true,
	},
};