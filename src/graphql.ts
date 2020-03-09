import { ApolloServer, PubSub } from "apollo-server-express";
import { Express } from "express";
import schema from "./schema";
import { SUBSCRIPTION_ENDPOINT } from "./types/constants";

export default (app: Express, pubSub: PubSub) => {
	const graphqlServer = new ApolloServer({
		playground: true,
		schema,
		context: async ({ req }) => {
			return { req, pubSub };
		},
		subscriptions: {
			path: SUBSCRIPTION_ENDPOINT
		}
	});

	graphqlServer.applyMiddleware({ app });
};
