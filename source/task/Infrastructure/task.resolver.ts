import { UCShared } from "../../shared/Application/shared.usecases";
import { UCTask } from "../Application/task.usecases";

export class TaskResolver {

    constructor(private taskUseCases: UCTask, private sharedUseCases: UCShared){
        this.Create = this.Create.bind(this);
        this.Update = this.Update.bind(this)
    }

    public async Create(_: any, { input }: any, context: any){

        if(!context.authorization) throw new Error('Authorization denied');

        const data = {
            name: input.name,
            project_ID: input.project_ID,
            author_ID: context.authorization.ID
        }

        // Check that project exists
        await this.sharedUseCases.Exists({ ID: data.project_ID }, { Project: true });

        const result = await this.taskUseCases.Create(data.name, data.project_ID, data.author_ID);
        return result;
    }

    public async Update(_: any, { input }: any, context: any){

        if(!context.authorization) throw new Error('Authorization denied');

        const data = {
            ID: input.ID,
            name: input.name,
            status: input.status,
            project_ID: input.project_ID,
            author_ID: context.authorization.ID
        }

        // Checks if user wants move the task to other project.
        if(data.project_ID){
            // Checks that project exists, if not found, throw exception
            await this.sharedUseCases.Exists({ ID: data.project_ID }, { Project: true });
        }

        const result = await this.taskUseCases.Update(data.ID, data.author_ID, data.name, data.status, data.project_ID);
        return result;
    }
}