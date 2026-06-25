import { container, Logger, QueueService, asyncLocalStorage } from "@structured-growth/microservice-sdk";
import { handlers } from "./handlers";
import * as hyperid from "hyperid";

const generator = hyperid({ urlSafe: true });

const getStore = () => ({
	id: generator(),
	i18n: null,
});

export function startSqsListener(): void {
	const logger = container.resolve<Logger>("Logger");
	const queueUrl = container.resolve<string>("journalApiQueueName");
	const queue = container.resolve<QueueService>("QueueService");

	queue.subscribe(queueUrl, async ({ source, subject, message }, event) => {
		await asyncLocalStorage.run(getStore(), async () => {
			await Promise.all(handlers.map((h) => h(subject, message)));
		});
	});

	logger.info("SQS subscriber started");
}
