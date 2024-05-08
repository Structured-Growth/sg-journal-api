import { DefaultSearchParamsInterface } from "@structured-growth/microservice-sdk";

export interface JournalEntrySearchParamsInterface
	extends Omit<DefaultSearchParamsInterface, "id" | "orgId" | "accountId" | "arn"> {
	/**
	 * asdfasdfsadfsadf
	 */
	principal?: string;
	resource?: string;
	action?: string;
}
