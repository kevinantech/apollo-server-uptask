import { ProjectRepository } from "../Domain/project.repository";
import { ProjectModel } from "./project.model";
import { IProject } from "../Domain/project.entity";

export class ProjectDatabaseRepository implements ProjectRepository {
    
    async GetAll(AUTHOR_ID: string): Promise<IProject[] | null> {   
        
        const filter = { AUTHOR_ID }
        
        try {
            const projects = await ProjectModel.find(filter, { _id: 0, ID: 1, name: 1, created: 1 });
            return projects;
        } catch (e) {
            console.log({
                at: `${__dirname} ProjectDatabaseRepository.GetAll`,
                message: e 
            });
            return null;
        }
    }

    async Create(project: IProject): Promise<{ ID: string } | null> {
        const projectModel = new ProjectModel(project);
        try {
            const { ID } = await projectModel.save();
            return { ID };
        } catch(e) {
            console.log({
                at: `${__dirname} ProjectDatabaseRepository.Create`,
                message: e 
            });
            return null;
        };
    }

    async Update({ ID, name, CURRENT_EDITOR }: {ID: string; name: string, CURRENT_EDITOR: string}): Promise<{name: string;} | null> {
        
        const filter = { ID };
        const changes = { name };

        try {
            // Verify that the project exists.
            const exists = await ProjectModel.findOne(filter);
            if(!exists) throw new Error('The project does not exist');

            // Verify that user match with the project autor.
            if(exists.AUTHOR_ID != CURRENT_EDITOR) throw new Error("You dont have permissions");

            const { name } = <IProject> await ProjectModel.findOneAndUpdate(filter, changes, { new: true });
            return { name };
        } catch (e) {
            console.log({
                at: `${__dirname} ProjectDatabaseRepository.Update`,
                message: e 
            });
            return null;
        }
    }

    async Delete({ ID, CURRENT_EDITOR }: {ID: string, CURRENT_EDITOR: string}): Promise<string | null> {

        const filter = { ID };

        try {
            // Verify that the project exists.
            const exists = await ProjectModel.findOne(filter);
            if(!exists) throw new Error('The project does not exist');

            // Verify that user match with the project autor.
            if(exists.AUTHOR_ID != CURRENT_EDITOR) throw new Error("You dont have permissions");

            await ProjectModel.deleteOne(filter);
            return "Successful Delete";
        } catch (e) {
            console.log({
                at: `${__dirname} ProjectDatabaseRepository.Delete`,
                message: e 
            });
            return null;
        }
    }
    
}