"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const actions = ["account/create", "account/update", "account/delete"];
		const statuses = ["active", "inactive", "archived"];

		await queryInterface.bulkInsert(
			"journal-entries",
			Array(20)
				.fill()
				.map((_, index) => ({
					orgId: index + 1,
					region: "us",
					accountId: 1000 + index,
					principal: `sg-account-api:us:${index + 1}:1`,
					resource: `sg-account-api:us:${index + 1}:2`,
					action: `sg-account-api:${actions[Math.floor(Math.random() * actions.length)]}`,
					data: JSON.stringify({
						accountId: index + 1,
						status: statuses[Math.floor(Math.random() * statuses.length)],
					}),
					created_at: new Date(),
				})),
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("journal-entries", null, {});
	},
};
