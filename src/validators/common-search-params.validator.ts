import { joi } from "@structured-growth/microservice-sdk";

export const CommonSearchParamsValidator = joi.object({
	page: joi.number().positive().label("Page"),
	limit: joi.number().positive().label("Limit"),
	sort: joi.array().items(joi.string().required()).label("Sort"),
});
