import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Resolvers } from "./GraphQL/Resolvers";
import { TypeDefs } from "./GraphQL/TypeDefs";
import { dbConnect } from "../config";
import { auth } from "./GraphQL/context.values";

const Bootstrap = async () => {

    dbConnect();
    const Server = new ApolloServer({
        typeDefs: TypeDefs,
        resolvers: Resolvers
    })

    const { url } = await startStandaloneServer(Server, {
        listen: { port: 4000 },
        context: async ({req}) => ({
            Auth: auth(req.headers.authorization)
        })
    })
    console.log(`🚀  Server ready at: ${url}`);
}

Bootstrap();