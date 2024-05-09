import "../../../../src/app/providers";
import { assert } from "chai";
import { initTest } from "../../../common/init-test";

describe("GET /api/v1/journal-entries", () => {
	const { server, context } = initTest();

	it("Should return 0 account", async () => {
		const { statusCode, body } = await server.get("/v1/journal-entries").query({
			principal: "999999",
		});
		assert.equal(statusCode, 200);
	});

	it("Should return entries", async () => {
		const { statusCode, body } = await server.get("/v1/journal-entries").query({});
		assert.equal(statusCode, 200);
		assert.isString(body.data[0].principal);
		assert.isString(body.data[0].resource);
		assert.isString(body.data[0].action);
		assert.equal(body.page, 1);
		assert.equal(body.limit, 20);
	});

	it("Should return validation error", async () => {
		const { statusCode, body } = await server.get("/v1/journal-entries").query({
			principal: -1,
			resource: 999,
			action: 1,
			page: 0,
			limit: false,
			sort: "createdAt:asc",
		});
		assert.equal(statusCode, 422);
		assert.equal(body.name, "ValidationError");
		assert.isString(body.message);
	});
});
