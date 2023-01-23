import { UCShared } from "../../shared/Application/shared.usecases";
import { UCTask } from "../Application/task.usecases";

export class TaskResolver {

    constructor(private taskUseCases: UCTask, private sharedUseCases: UCShared) {
        this.Create = this.Create.bind(this);
        this.Update = this.Update.bind(this)
    }

    public async Create(_: any, { input }: any, context: any) {

        if(!context.authorization) throw new Error('Authorization denied');

        const body = {
            name: input.name,
            project_id: input.project_id,
            author_id: context.authorization.ID
        }

        // Checks that the project exists. If not found, throw exception
        await this.sharedUseCases.Exists({ ID: body.project_id }, { Project: true });

        const data = await this.taskUseCases.Create(body.name, body.project_id, body.author_id);
        return data;
    }

    public async Update(_: any, { input }: any, context: any) {

        if(!context.authorization) throw new Error('Authorization denied');

        const body = {
            ID: input.ID,
            name: input.name,
            status: input.status,
            project_id: input.project_id,
            author_id: context.authorization.ID
        }

        // Checks if the user wants move the task to other project.
        if(body.project_id){
            // Checks that the project exists. If not found, throw exception
            await this.sharedUseCases.Exists({ ID: body.project_id }, { Project: true });
        }

        const data = await this.taskUseCases.Update(body.ID, body.author_id, body.name, body.status, body.project_id);
        return data;
    }
}