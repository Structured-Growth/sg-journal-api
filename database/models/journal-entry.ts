import { Column, DataType, Model, Table } from "sequelize-typescript";
import {
	RegionEnum,
	DefaultModelInterface,
	HasTimestampsInterface,
	HasArnInterface,
} from "@structured-growth/microservice-sdk";

export interface JournalEntryAttributes
	extends Omit<DefaultModelInterface, keyof HasTimestampsInterface | keyof HasArnInterface> {
	principal: string;
	resource: string;
	action: string;
	data: string;
	createdAt: Date;
}

export interface JournalEntryCreationAttributes extends Omit<JournalEntryAttributes, "id"> {}

@Table({
	tableName: "journalEntries",
	timestamps: true,
	underscored: true,
})
export class JournalEntry
	extends Model<JournalEntryAttributes, JournalEntryCreationAttributes>
	implements JournalEntryAttributes
{
	@Column
	orgId: number;

	@Column
	region: RegionEnum;

	@Column
	accountId: number;

	@Column
	principal: string;

	@Column
	resource: string;

	@Column
	action: string;

	@Column(DataType.TEXT)
	data: string;

	@Column(DataType.DATE)
	createdAt: Date;
}

export default JournalEntry;
