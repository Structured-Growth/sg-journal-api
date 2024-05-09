import { DefaultSearchParamsInterface } from "@structured-growth/microservice-sdk";

export interface JournalEntrySearchParamsInterface
	extends Omit<DefaultSearchParamsInterface, "id" | "orgId" | "accountId" | "arn"> {
	/**
	 * Who performed an action.
	 */
	principal?: string;
	/**
	 * On which resource action was performed.
	 */
	resource?: string;
	/**
	 * What type of action was performed.
	 */
	action?: string;
}
