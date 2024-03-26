module.exports = {
	development: {
		username: 'root', //use process.env
		password: '',
		database: 'billing',
		host: 'localhost',
		dialect: 'mysql',
		underscored: true,
	},
	production: {
		username: 'root',
		password: '',
		database: 'billing',
		host: 'localhost',
		dialect: 'mysql',
		underscored: true,
	},
};
