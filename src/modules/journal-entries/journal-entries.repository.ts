import { Op } from "sequelize";
import { autoInjectable, RepositoryInterface, SearchResultInterface } from "@structured-growth/microservice-sdk";
import JournalEntry, { JournalEntryCreationAttributes } from "../../../database/models/journal-entry";
import { JournalEntrySearchParamsInterface } from "../../interfaces/journal-entry-search-params.interface";

@autoInjectable()
export class JournalEntryRepository
	implements RepositoryInterface<JournalEntry, JournalEntrySearchParamsInterface, JournalEntryCreationAttributes>
{
	public async search(params: JournalEntrySearchParamsInterface): Promise<SearchResultInterface<JournalEntry>> {
		const page = params.page || 1;
		const limit = params.limit || 20;
		const offset = (page - 1) * limit;
		const where = {};
		const order = params.sort ? (params.sort.map((item) => item.split(":")) as any) : [["createdAt", "desc"]];

		params.id && (where["id"] = { [Op.in]: params.id });
		params.orgId && (where["orgId"] = params.orgId);
		params.accountId && (where["accountId"] = params.accountId);

		params.principal && (where["principal"] = params.principal);
		params.resource && (where["resource"] = params.resource);
		params.action && (where["action"] = params.action);

		const { rows, count } = await JournalEntry.findAndCountAll({
			where,
			offset,
			limit,
			order,
		});

		return {
			data: rows,
			total: count,
			limit,
			page,
		};
	}

	public async create(data: JournalEntryCreationAttributes): Promise<JournalEntry> {
		throw new Error("Not implemented");
	}

	public async read(id: number): Promise<JournalEntry | null> {
		throw new Error("Not implemented");
	}

	public async update(id: number, data: Partial<JournalEntryCreationAttributes>): Promise<JournalEntry> {
		throw new Error("Not implemented");
	}

	public async delete(id: number): Promise<void> {
		throw new Error("Not implemented");
	}
}
