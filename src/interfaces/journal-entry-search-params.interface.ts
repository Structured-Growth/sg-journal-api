import { DefaultSearchParamsInterface } from "@structured-growth/microservice-sdk";

export interface JournalEntrySearchParamsInterface extends Omit<DefaultSearchParamsInterface, "arn"> {
	principal?: string;
	resource?: string;
	action?: string;
}
