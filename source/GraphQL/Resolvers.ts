import { UCUser } from "../User/Application/user.usecases";
import { ProjectDatabaseRepository } from "../Project/Infrastructure/project.database";
import { UserDatabaseRepository } from "../User/Infrastructure/user.database";
import { UserResolver } from "../User/Infrastructure/user.resolver";
import { UCProject } from "../Project/Application/project.usecases";
import { ProjectResolver } from "../Project/Infrastructure/project.resolver";

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