import { container } from "@structured-growth/microservice-sdk";
import { JournalEntryRepository } from "../../modules/journal-entries/journal-entries.repository";

export async function mutationEventsHandler(subject: string, message: any) {
	const journalRepository: JournalEntryRepository = container.resolve<JournalEntryRepository>("JournalEntryRepository");

	if (subject.endsWith("events/mutation")) {
		await journalRepository.create({
			principal: message.principalArn,
			resource: message.resourceArn,
			action: message.action,
			data: message.changes,
			createdAt: new Date(),
		});
	}
}
