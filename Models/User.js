const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init(
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
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		roleId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'roles', 
				key: 'id', 
			},
			onUpdate: 'CASCADE', 
			onDelete: 'CASCADE', 
		},
	},
	{
		sequelize,
		modelName: 'User',
		tableName: 'users',
		timestamps: true,
		underscored: true,
	}
);

module.exports = User;
