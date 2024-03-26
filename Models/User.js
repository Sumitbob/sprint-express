const {Model, DataTypes} = require('sequelize');

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		mobileNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				msg: 'Mobile number already exists',
			},
			validate: {
				notNull: {
					msg: 'Mobile number is required',
				},
			},
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: SQL,
		modelName: 'User',
		tableName: 'users',
		timestamps: true,
		underscored: true,
	}
);

module.exports = User;
