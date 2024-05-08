import { joi } from "@structured-growth/microservice-sdk";
import { CommonSearchParamsValidator } from "./common-search-params.validator";

export const JournalEntriesSearchParamsValidator = joi.object({
	query: joi
		.object({
			principal: joi.string().max(255).required(),
			resource: joi.string().max(255).required(),
			action: joi.string().max(255).required(),
		})
		.concat(CommonSearchParamsValidator),
});
