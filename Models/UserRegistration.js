const {Model, DataTypes} = require('sequelize');

class UserRegistration extends Model {}

UserRegistration.init(
	{
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		mobile: {
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
		verified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			unique: true,
			defaultValue: false,
		}
	},
	{
		sequelize,
		modelName: 'UserRegistration',
		tableName: 'user_registration',
		timestamps: true,
		underscored: true,
	}
);

module.exports = UserRegistration;
