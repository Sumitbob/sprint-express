'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			mobileNumber: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				field: 'mobile_number'
			},
			passwordHash: {
				type: Sequelize.STRING,
				allowNull: false,
				field: 'password_hash'
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				field: 'created_at'
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal(
					'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
				),
				field: 'updated_at'
			},
		});
	},

	down: async (queryInterface) => {
		// Drop the users table if the migration needs to be reverted
		await queryInterface.dropTable('users');
	},
};
