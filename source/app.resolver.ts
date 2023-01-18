import { UserResolver } from "./User/Infrastructure/user.resolver";

const userResolver = new UserResolver();

const AppResolvers = {
    Query: {

    },
    Mutation: {
        CreateUser: userResolver.CreateUser,
        AuthUser: userResolver.AuthUser,
    }
}

export {AppResolvers};