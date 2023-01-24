import { UserDatabaseRepository } from "../user/Infrastructure/user.database";
import { ProjectDatabaseRepository } from "../project/Infrastructure/project.database";
import { TaskDatabaseRepository } from "../task/Infrastructure/task.database";
import { UCUser } from "../user/Application/user.usecases";
import { UCProject } from "../project/Application/project.usecases";
import { UCTask } from "../task/Application/task.usecases";
import { UserResolver } from "../user/Infrastructure/user.resolver";
import { ProjectResolver } from "../project/Infrastructure/project.resolver";
import { TaskResolver } from "../task/Infrastructure/task.resolver";

// Repos 
const userRepo = new UserDatabaseRepository();
const projectRepo = new ProjectDatabaseRepository();
const taskRepo = new TaskDatabaseRepository();

// Use cases 
const userUseCases = new UCUser(userRepo);
const projectUseCases = new UCProject(projectRepo, taskRepo);
const taskUseCases = new UCTask(taskRepo, projectRepo);

// Resolvers
const userResolver = new UserResolver(userUseCases);
const projectResolver = new ProjectResolver(projectUseCases);
const taskResolver = new TaskResolver(taskUseCases); 

const Resolvers = {
    Query: {

        // PROJECT
        GetProjects: projectResolver.GetProjects,

        // TASK
        GetTasks: taskResolver.GetTasks
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
        UpdateTask: taskResolver.Update,
        DeleteTask: taskResolver.Delete
    }
}

export {Resolvers};