'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			roleId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				field: 'role_id',
				references: {
					model: 'roles',
					key: 'id', 
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			mobile: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				field: 'mobile',
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false,
				field: 'first_name',
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false,
				field: 'last_name',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				field: 'created_at',
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
				field: 'updated_at',
			},
		});

		await queryInterface.sequelize.query(`
      ALTER TABLE users AUTO_INCREMENT = 1000000000001;
    `);
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable('users');
	},
};
