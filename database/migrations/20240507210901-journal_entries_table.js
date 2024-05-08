"use strict";

const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable("journal-entries", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			orgId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			region: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			accountId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			principal: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			resource: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			action: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			data: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			created_at: Sequelize.DATE,
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("journal-entries");
	},
};
