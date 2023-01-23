import { IProject } from "../Domain/project.entity";
import { ProjectRepository } from "../Domain/project.repository";
import Project from "../Domain/project.value";

export class UCProject {
    constructor(private readonly projectRepository: ProjectRepository){}

    public async GetAll(author_id: string): Promise<IProject[]> {
        const projects = await this.projectRepository.GetAll(author_id);
        return projects;
    }

    public async Create(nameArg: string, authorArg: string): Promise<{ ID: string; name: string }> {
        const project = new Project(nameArg, authorArg);
        const savedProject = await this.projectRepository.Create(project);
        const { ID, name } = savedProject;
        return { ID, name };
    }

    public async Update(idArg: string, nameArg: string, editorArg: string): Promise<{ ID: string; name: string; } | null> {
        const updatedProject = await this.projectRepository.Update(idArg, nameArg, editorArg);
        if(!updatedProject) return null;
        const { ID, name } = updatedProject;
        return { ID, name };
    }

    public async Delete(idArg: string, editorArg: string): Promise<{ID: string} | null> {
        const deletedProject = await this.projectRepository.Delete(idArg, editorArg);
        if(!deletedProject) return null;
        const { ID } = deletedProject;
        return { ID };
    }
}