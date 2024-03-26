const {Model, DataTypes} = require('sequelize');

class BaseModel extends Model {}

BaseModel.init(
	{
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		}
	},
	{
		sequelize: SQL,
		modelName: 'BaseModel',
		timestamps: true,
		underscored: true
	}
);

module.exports = BaseModel;
