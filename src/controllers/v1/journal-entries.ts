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
	"orgId",
	"accountId",
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
	 */
	@OperationId("Search")
	@Get("/")
	@SuccessResponse(200, "Returns list of journal entries")
	@DescribeAction("journal-entries/search")
	@DescribeResource("Organization", ({ query }) => Number(query.orgId))
	@ValidateFuncArgs(JournalEntriesSearchParamsValidator)
	async search(
		@Queries() query: JournalEntrySearchParamsInterface
	): Promise<SearchResultInterface<PublicJournalEntryAttributes>> {
		const { data, ...result } = await this.journalEntryRepository.search(query);

		return {
			data: data.map((account) => ({
				...(pick(account.toJSON(), publicJournalEntryAttributes) as PublicJournalEntryAttributes),
			})),
			...result,
		};
	}
}
