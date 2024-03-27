const { Model, DataTypes } = require('sequelize');

class Role extends Model {}

Role.init(
	{
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Role',
		tableName: 'roles',
		timestamps: true,
		underscored: true,
	}
);

module.exports = Role;
