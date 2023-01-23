import { ProjectRepository } from "../Domain/project.repository";
import { ProjectModel } from "./project.model";
import { IProject } from "../Domain/project.entity";

export class ProjectDatabaseRepository implements ProjectRepository {
    
    async GetAll(author_id: string): Promise<IProject[]> {   
        const filter = { author_id };
        const projects = await ProjectModel.find(filter);
        return projects;
    }

    async Create(project: IProject): Promise<IProject> {
        const projectModel = new ProjectModel(project);
        try {
            const savedProject = await projectModel.save();
            return savedProject;
        } catch(e) {
            console.error({ at: `${__dirname} => Create`, message: e });
            throw new Error('Could not create');
        };
    }

    async Update(ID: string, name: string, editor_id: string): Promise<IProject | null> {
        const filter = { ID };
        const changes = { name };
        
        // Verify that the project exists.
        const project = await ProjectModel.findOne(filter);
        if(!project) throw new Error('The project does not exist');

        // Verify that editor matchs with the project autor.
        if(editor_id != project.author_id) throw new Error("You dont have permissions");

        // Update the project
        const projectUpdated = await ProjectModel.findOneAndUpdate(filter, changes, { new: true });
        return projectUpdated;
    }

    async Delete(ID: string, editor_id: string): Promise<IProject | null> {
        const filter = { ID };

        // Verify that the project exists.
        const project = await ProjectModel.findOne(filter);
        if(!project) throw new Error('The project does not exist');
        
        // Verify that user match with the project autor.
        if(editor_id != project.author_id) throw new Error("You dont have permissions");

        // Delete the project
        const result = await ProjectModel.findOneAndDelete(filter);
        return result;
    }   
}