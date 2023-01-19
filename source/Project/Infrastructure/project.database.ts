import { ProjectRepository } from "../Domain/project.repository";
import { ProjectModel } from "./project.model";
import { IProject } from "../Domain/project.entity";

export class ProjectDatabaseRepository implements ProjectRepository {
    
    async GetAll(AUTHOR_ID: string): Promise<IProject[]> {
        const projects = await ProjectModel.find({ AUTHOR_ID });
        return projects;
    }

    //TODO: Complete 
    async Create(name: string): Promise<{ ID: string; }> {
        name
        return { ID: "" }
    }

    //TODO: Complete
    async Update({ ID, name }: { ID: string; name: string; }): Promise<{ name: string; }> {
        ID
        return {
            name
        }
    }

    //TODO: Complete
    async Delete(ID: string): Promise<{ ID: string; }> {
        return {
            ID
        }
    }
    
}