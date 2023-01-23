import { UserDatabaseRepository } from "../user/Infrastructure/user.database";
import { ProjectDatabaseRepository } from "../project/Infrastructure/project.database";
import { TaskDatabaseRepository } from "../task/Infrastructure/task.database";
import { UCUser } from "../user/Application/user.usecases";
import { UCProject } from "../project/Application/project.usecases";
import { UCTask } from "../task/Application/task.usecases";
import { UserResolver } from "../user/Infrastructure/user.resolver";
import { ProjectResolver } from "../project/Infrastructure/project.resolver";
import { TaskResolver } from "../task/Infrastructure/task.resolver";

// User's dependency injection 
const userRepo = new UserDatabaseRepository();
const userUseCases = new UCUser(userRepo);
const userResolver = new UserResolver(userUseCases);

// Project's dependency injection
const projectRepo = new ProjectDatabaseRepository();
const projectUseCases = new UCProject(projectRepo);
const projectResolver = new ProjectResolver(projectUseCases);

// Task's dependency injection
const taskRepo = new TaskDatabaseRepository();
const taskUseCases = new UCTask(taskRepo, projectRepo);
const taskResolver = new TaskResolver(taskUseCases);

const Resolvers = {
    Query: {
        GetProjects: projectResolver.GetAll
    },
    Mutation: {

        // USER
        CreateUser: userResolver.Create,
        AuthUser: userResolver.Auth,

        // PROJECT
        CreateProject: projectResolver.Create,
        UpdateProject: projectResolver.Update,
        DeleteProject: projectResolver.Delete,

        // TASK 
        CreateTask: taskResolver.Create,
        UpdateTask: taskResolver.Update
    }
}

export {Resolvers};