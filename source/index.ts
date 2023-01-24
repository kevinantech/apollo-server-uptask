import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { Resolvers } from "./GraphQL/resolvers"
import { TypeDefs } from "./GraphQL/typeDefs"
import { AuthToken } from "./GraphQL/context.values"
import { dbConnect } from "../config"

const Bootstrap = async () => {
    dbConnect()
    const Server = new ApolloServer({ typeDefs: TypeDefs, resolvers: Resolvers })
    const { url } = await startStandaloneServer(Server, {
        listen: { port: 4000 },
        context: async ({ req }) => ({
            authorization: AuthToken(req.headers.authorization)
        })
    })
    console.log(`🚀  Server ready at: ${url}`)
}
Bootstrap()