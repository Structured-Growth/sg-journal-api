import { Get, Route, Tags, Queries, OperationId, SuccessResponse } from "tsoa";
import {
	autoInjectable,
	BaseController,
	DescribeAction,
	DescribeResource,
	inject,
	ValidateFuncArgs,
	SearchResultInterface,
} from "@structured-growth/microservice-sdk";
import { pick } from "lodash";
import { JournalEntryAttributes } from "../../../database/models/journal-entry";
import { JournalEntrySearchParamsInterface } from "../../interfaces/journal-entry-search-params.interface";
import { JournalEntryRepository } from "../../modules/journal-entries/journal-entries.repository";
import { JournalEntriesSearchParamsValidator } from "../../validators/journal-entries-search-params.validator";

const publicJournalEntryAttributes = [
	"id",
	"principal",
	"resource",
	"action",
	"data",
	"createdAt",
] as const;
type JournalEntryKeys = (typeof publicJournalEntryAttributes)[number];
type PublicJournalEntryAttributes = Pick<JournalEntryAttributes, JournalEntryKeys>;

@Route("v1/journal-entries")
@Tags("JournalEntries")
@autoInjectable()
export class JournalEntriesController extends BaseController {
	constructor(@inject("JournalEntryRepository") private journalEntryRepository: JournalEntryRepository) {
		super();
	}

	/**
	 * Search JournalEntries
	 *
	 * principal: sg-account-api:us:1:1
	 */
	@OperationId("Search")
	@Get("/")
	@SuccessResponse(200, "Returns list of journal entries")
	@DescribeAction("journal-entries/search")
	@ValidateFuncArgs(JournalEntriesSearchParamsValidator)
	async search(
		@Queries() query: JournalEntrySearchParamsInterface
	): Promise<SearchResultInterface<PublicJournalEntryAttributes>> {
		return undefined;
	}
}
