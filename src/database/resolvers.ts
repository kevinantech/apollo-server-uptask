import { UserResolver } from "./resolvers/user.resolver";
import { ProjectResolver } from "./resolvers/project.resolver";

const resolvers = {
    Query: {
      projects: ProjectResolver.getAll
    },
    Mutation: {
      createUser: UserResolver.create,
      authUser: UserResolver.auth,
      createProject: ProjectResolver.create,
      updateProject: ProjectResolver.update,
      deleteProject: ProjectResolver.delete
    }
};
export default resolvers;