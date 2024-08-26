"use strict";

const Sequelize = require("sequelize");

/** @type {import("sequelize-cli").Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable(
			{
				schema: process.env.DB_SCHEMA,
				tableName: "journal_entries",
			},
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				principal: {
					type: Sequelize.STRING(255),
					allowNull: false,
				},
				resource: {
					type: Sequelize.STRING(255),
					allowNull: false,
				},
				action: {
					type: Sequelize.STRING(255),
					allowNull: false,
				},
				data: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				created_at: Sequelize.DATE,
			}
		);
	},

	async down(queryInterface) {
		await queryInterface.dropTable({
			schema: process.env.DB_SCHEMA,
			tableName: "journal_entries",
		});
	},
};
