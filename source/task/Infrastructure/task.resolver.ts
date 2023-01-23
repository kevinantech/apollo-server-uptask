import { UCTask } from "../Application/task.usecases";

export class TaskResolver {

    constructor(private taskUseCases: UCTask) {
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
        const data = await this.taskUseCases.Create(body.name, body.project_id, body.author_id);
        return data;
    }

    public async Update(_: any, { input }: any, context: any) {
        if(!context.authorization) throw new Error('Authorization denied');
        const body = {
            ID: input.ID,
            name: input.name,
            status: input.status,
            author_id: context.authorization.ID
        }
        const data = await this.taskUseCases.Update(body.ID, body.author_id, body.name, body.status);
        return data;
    }
}