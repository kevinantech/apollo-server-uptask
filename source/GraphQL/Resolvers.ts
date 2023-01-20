import { UserDatabaseRepository } from "../user/Infrastructure/user.database";
import { UCUser } from "../user/Application/user.usecases";
import { UserResolver } from "../user/Infrastructure/user.resolver";
import { ProjectDatabaseRepository } from "../project/Infrastructure/project.database";
import { UCProject } from "../project/Application/project.usecases";
import { ProjectResolver } from "../project/Infrastructure/project.resolver";

// User's dependency injection 
const userRepo = new UserDatabaseRepository();
const userUseCases = new UCUser(userRepo);
const userResolver = new UserResolver(userUseCases);

// Project's dependency injection
const projectRepo = new ProjectDatabaseRepository();
const projectUseCases = new UCProject(projectRepo);
const projectResolver = new ProjectResolver(projectUseCases);

//

const Resolvers = {
    Query: {
        AuthUser: userResolver.Auth,
        GetProjects: projectResolver.GetAll
    },
    Mutation: {
        CreateUser: userResolver.Create,
        CreateProject: projectResolver.Create,
        UpdateProject: projectResolver.Update,
        DeleteProject: projectResolver.Delete
    }
}

export {Resolvers};