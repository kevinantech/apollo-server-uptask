import { dbConnect } from "../config";
import { AppResolvers } from "./app.resolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/dist/esm/standalone";
import { auth } from "./app.context";

const Bootstrap = async () => {

    dbConnect();
    const Server = new ApolloServer({
        typeDefs: "",
        resolvers: AppResolvers
    })

    const { url } = await startStandaloneServer(Server, {
        listen: { port: 4000 },
        context: async ({req}) => ({
            Auth: auth(req.headers.authorization)
        })
    })
    console.log(`🚀  Server ready at: ${url}`);
}

export {Bootstrap};