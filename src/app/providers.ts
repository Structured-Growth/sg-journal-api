import "reflect-metadata";
import "./load-environment";
import { App } from "./app";
import {
	container,
	Lifecycle,
	logWriters,
	Logger,
	eventBusProviders,
	EventbusService,
	queueProviders,
	QueueService,
	PolicyService,
	AuthService,
} from "@structured-growth/microservice-sdk";
import { loadEnvironment } from "./load-environment";
import { JournalEntryRepository } from "../modules/journal-entries/journal-entries.repository";

// load and validate env variables
loadEnvironment();

// const
container.register("appPrefix", { useValue: process.env.APP_PREFIX });
container.register("stage", { useValue: process.env.STAGE });
container.register("region", { useValue: process.env.REGION });
container.register("isDev", { useValue: process.env.STAGE === "dev" });
container.register("isTest", { useValue: process.env.STAGE === "test" });
container.register("logDbRequests", { useValue: process.env.LOG_DB_REQUESTS === "true" });
container.register("logRequestBody", { useValue: process.env.LOG_HTTP_REQUEST_BODY === "true" });
container.register("logResponses", { useValue: process.env.LOG_HTTP_RESPONSES === "true" });
container.register("journalApiQueueName", { useValue: process.env.JOURNAL_API_QUEUE_NAME });

// services
container.register("LogWriter", logWriters[process.env.LOG_WRITER] || "ConsoleLogWriter", {
	lifecycle: Lifecycle.Singleton,
});
container.register("Logger", Logger);
container.register("App", App, { lifecycle: Lifecycle.Singleton });

container.register("eventbusName", { useValue: process.env.EVENTBUS_NAME || "sg-eventbus-dev" });
container.register(
	"EventbusProvider",
	eventBusProviders[process.env.EVENTBUS_PROVIDER || "AwsEventBridgeEventbusProvider"]
);
container.register("EventbusService", EventbusService);

container.register("QueueProvider", queueProviders.AwsSqsQueueProvider);
container.register("QueueService", QueueService);

container.register("authenticationEnabled", { useValue: process.env.AUTHENTICATION_ENABLED === "true" });
container.register("authorizationEnabled", { useValue: process.env.AUTHORIZATION_ENABLED === "true" });
container.register("oAuthServiceGetUserUrl", { useValue: process.env.OAUTH_USER_URL });
container.register("policiesServiceUrl", { useValue: process.env.POLICY_SERVICE_URL });
container.register("AuthService", AuthService);
container.register("PolicyService", PolicyService);

// repositories
container.register("JournalEntryRepository", JournalEntryRepository);
