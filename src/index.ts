import { ApolloServer} from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { dbConnect } from "./config";
import typeDefs from "./database/schema";
import resolvers from "./database/resolvers";
import { authToken } from "./database/context.values";

const bootstrap = async () => {
  dbConnect();
  const Server = new ApolloServer({ typeDefs, resolvers});
  const { url } = await startStandaloneServer(Server, {
    context: async ({req}) => ({
      auth: authToken(req.headers.authorization)
    }),
    listen: { port: 4000 }
  });
  console.log(`🚀  Server ready at: ${url}`);
}
bootstrap();