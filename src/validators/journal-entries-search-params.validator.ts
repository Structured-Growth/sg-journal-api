import { joi } from "@structured-growth/microservice-sdk";
import { CommonSearchParamsValidator } from "./common-search-params.validator";

export const JournalEntriesSearchParamsValidator = joi.object({
	query: joi
		.object({
			principal: joi.string().max(255).label("Principal"),
			resource: joi.string().max(3).label("Resource"),
			action: joi.string().max(255).label("Action"),
		})
		.concat(CommonSearchParamsValidator),
});
