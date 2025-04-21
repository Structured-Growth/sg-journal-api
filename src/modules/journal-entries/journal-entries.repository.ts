import { Op } from "sequelize";
import {
	autoInjectable,
	RepositoryInterface,
	SearchResultInterface,
	I18nType,
	inject,
} from "@structured-growth/microservice-sdk";
import JournalEntry, { JournalEntryCreationAttributes } from "../../../database/models/journal-entry";
import { JournalEntrySearchParamsInterface } from "../../interfaces/journal-entry-search-params.interface";

@autoInjectable()
export class JournalEntryRepository
	implements RepositoryInterface<JournalEntry, JournalEntrySearchParamsInterface, JournalEntryCreationAttributes>
{
	private i18n: I18nType;
	constructor(@inject("i18n") private getI18n: () => I18nType) {
		this.i18n = this.getI18n();
	}
	public async search(params: JournalEntrySearchParamsInterface): Promise<SearchResultInterface<JournalEntry>> {
		const page = params.page || 1;
		const limit = params.limit || 20;
		const offset = (page - 1) * limit;
		const where = {};
		const order = params.sort ? (params.sort.map((item) => item.split(":")) as any) : [["createdAt", "desc"]];

		if (params.principal) {
			where["principal"] = {
				[Op.iLike]: params.principal.replace(/\*/g, "%"),
			};
		}
		if (params.resource) {
			where["resource"] = {
				[Op.iLike]: params.resource.replace(/\*/g, "%"),
			};
		}
		if (params.action) {
			where["action"] = {
				[Op.iLike]: params.action.replace(/\*/g, "%"),
			};
		}

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
		return JournalEntry.create(data);
	}

	public async read(id: number): Promise<JournalEntry | null> {
		throw new Error(this.i18n.__("error.common.not_implemented"));
	}

	public async update(id: number, data: Partial<JournalEntryCreationAttributes>): Promise<JournalEntry> {
		throw new Error(this.i18n.__("error.common.not_implemented"));
	}

	public async delete(id: number): Promise<void> {
		throw new Error(this.i18n.__("error.common.not_implemented"));
	}
}
