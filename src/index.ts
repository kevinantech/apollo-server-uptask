import { ApolloServer} from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { dbConnect } from "./config";
import typeDefs from "./schema";
import resolvers from "./resolvers";

(async function() {

  dbConnect();

  const Server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  const { url } = await startStandaloneServer(Server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);

}())