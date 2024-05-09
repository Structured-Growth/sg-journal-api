import "./app/providers";
import { SQSEvent } from "aws-lambda";
import { container, Logger } from "@structured-growth/microservice-sdk";
import { App } from "./app/app";
import { JournalEntryRepository } from "./modules/journal-entries/journal-entries.repository";

const app = container.resolve<App>("App");
const logger = container.resolve<Logger>("Logger");
const journalRepository: JournalEntryRepository = container.resolve<JournalEntryRepository>("JournalEntryRepository");

export const handler = async (sqsEvent: SQSEvent) => {
	await app.ready;

	if (!sqsEvent.Records[0].body) {
		logger.warn("No event body", sqsEvent);
		return;
	}

	const data = JSON.parse(sqsEvent.Records[0].body);
	const source: string = data["source"];
	const event: string = data["detail-type"];
	const message: any = data["detail"];

	logger.info("Handle job from SQS", source, event, message);

	if (event.endsWith("events/mutation")) {
		await journalRepository.create({
			principal: message.principalArn,
			resource: message.resourceArn,
			action: message.action,
			data: message.changes,
			createdAt: new Date(),
		});
	}
};
