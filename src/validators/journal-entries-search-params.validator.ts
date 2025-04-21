import { joi } from "@structured-growth/microservice-sdk";
import { CommonSearchParamsValidator } from "./common-search-params.validator";

export const JournalEntriesSearchParamsValidator = joi.object({
	query: joi
		.object({
			principal: joi.string().max(255).label("validator.journal.principal"),
			resource: joi.string().max(255).label("validator.journal.resource"),
			action: joi.string().max(255).label("validator.journal.action"),
		})
		.concat(CommonSearchParamsValidator),
});
