'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('roles', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				field: 'name',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				field: 'created_at',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
				field: 'updated_at',
			},
		});
		await queryInterface.sequelize.query(`
      ALTER TABLE roles AUTO_INCREMENT = 10000000;
    `);
	},

	async down (queryInterface) {
		await queryInterface.dropTable('roles');
	},
};
