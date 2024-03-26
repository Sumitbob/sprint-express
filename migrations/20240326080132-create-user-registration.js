'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('user_registration', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			mobile: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				field: 'mobile',
			},
			verified: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				unique: true,
				defaultValue: false,
				field: 'verified',
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
      ALTER TABLE user_registration AUTO_INCREMENT = 10000000;
    `);
	},

	async down (queryInterface) {
		await queryInterface.dropTable('user_registration');
	}
};
