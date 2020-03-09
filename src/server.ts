import { PubSub } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import applyGraphqlServer from "./graphql";
import applyMiddlewaresTo from "./middleware";
import { subscriptionServerConn } from "./subscription";
import { openDBConn } from "./utils/databaseConn";

const app = express();
const PORT = process.env.PORT || "4000";
const pubSub = new PubSub();

// configure middlewares
applyMiddlewaresTo(app);

// configure graphql server
applyGraphqlServer(app, pubSub);

const listen = async () => {
	await openDBConn();

	const server = createServer(app);

	server.listen(PORT, () => {
		subscriptionServerConn(server, pubSub);
		console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
	});
};

export default {
	getApp: () => app,
	listen
};
