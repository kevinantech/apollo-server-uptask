import { UserResolver } from "./resolvers/user.resolver";
import { ProjectResolver } from "./resolvers/project.resolver";

const resolvers = {
    Query: {
      
    },
    Mutation: {
      createUser: UserResolver.create,
      authUser: UserResolver.auth,
      createProject: ProjectResolver.create
    }
};
export default resolvers;