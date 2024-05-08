import { joi } from "@structured-growth/microservice-sdk";

export const CommonSearchParamsValidator = joi.object({
	id: joi.array().items(joi.number().positive().required()).label("Entity IDs"),
	page: joi.number().positive().label("Page"),
	limit: joi.number().positive().label("Limit"),
	sort: joi.array().items(joi.string().required()).label("Sort"),
});
