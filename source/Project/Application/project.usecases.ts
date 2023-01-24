import { IProject } from "../Domain/project.entity";
import { ProjectRepository } from "../Domain/project.repository";
import Project from "../Domain/project.value";
import { TaskRepository } from "../../task/Domain/task.repository";

export class UCProject {
    constructor(private readonly projectRepository: ProjectRepository, private readonly taskRepository: TaskRepository){}

    public async GetProjects(author_id: string): Promise<IProject[]> {
        const projects = await this.projectRepository.findProjectsByAuthorId(author_id);
        return projects;
    }

    public async Create(nameArg: string, authorArg: string): Promise<{ ID: string; name: string; }> {
        const project = new Project(nameArg, authorArg);
        const savedProject = await this.projectRepository.registerProject(project);
        if(!savedProject) throw new Error('Could not save');
        const { ID, name } = savedProject;
        return { ID, name };
    }

    public async Update(idArg: string, nameArg: string, editorArg: string): Promise<{ ID: string; name: string; }> {

        // Verify that the project exists.
        const projectFound = await this.projectRepository.findProjectById(idArg);
        if(!projectFound) throw new Error('The project does not exist');

        // Verify that editor matches with the project autor.
        if(editorArg != projectFound.author_id) throw new Error("You dont have permissions");

        // Core
        const updatedProject = await this.projectRepository.updateProject(idArg, nameArg);
        if(!updatedProject) throw new Error('Could not update');
        const { ID, name } = updatedProject;
        return { ID, name };
    }

    public async Delete(idArg: string, editorArg: string): Promise<{ ID: string; }> {

        // Verify that the project exists.
        const projectFound = await this.projectRepository.findProjectById(idArg);
        if(!projectFound) throw new Error('The project does not exist');

        // Verify that editor matches with the project autor.
        if(editorArg != projectFound.author_id) throw new Error("You dont have permissions");

        // Deletes project's tasks.
        await this.taskRepository.deleteTasksByProjectId(idArg);

        const deletedProject = await this.projectRepository.deleteProject(idArg);
        if(!deletedProject) throw new Error('Could not delete');
        const { ID } = deletedProject;
        return { ID };
    }
}