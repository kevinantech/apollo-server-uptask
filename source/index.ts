import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './GraphQL/resolvers';
import { typeDefs } from './GraphQL/typeDefs';
import { AuthToken } from './GraphQL/context.values';
import { connectDatabase } from '../config';

const bootstrap = async () => {
    connectDatabase();
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => ({
            authorization: AuthToken(req.headers.authorization),
        })
    });
    console.log(`🚀  Server ready at: ${url}`);
};
bootstrap();