import { joi } from "@structured-growth/microservice-sdk";
import { CommonSearchParamsValidator } from "./common-search-params.validator";

export const JournalEntriesSearchParamsValidator = joi.object({
	query: joi
		.object({
			orgId: joi.number().positive().required().label("Organization Id"),
			accountId: joi.number().positive().required().label("Account Id"),
			principal: joi.string().max(100).required(),
			resource: joi.string().max(100).required(),
			action: joi.string().max(100).required(),
		})
		.concat(CommonSearchParamsValidator),
});
