import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface JournalEntryAttributes {
	id?: number;
	principal: string;
	resource: string;
	action: string;
	data: string;
	createdAt: Date;
}

export interface JournalEntryCreationAttributes extends Omit<JournalEntryAttributes, "id"> {}

@Table({
	tableName: "journal_entries",
	timestamps: true,
	underscored: true,
})
export class JournalEntry
	extends Model<JournalEntryAttributes, JournalEntryCreationAttributes>
	implements JournalEntryAttributes
{
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
