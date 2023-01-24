import { UCTask } from "../Application/task.usecases";

export class TaskResolver {

    constructor(private taskUseCases: UCTask) {
        this.GetTasks = this.GetTasks.bind(this);
        this.Create = this.Create.bind(this);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);
    }

    public async GetTasks(_: any, { input }: any, context: any) {
        if(!context.authorization) throw new Error('Authorization denied');
        const body = {
            project_id: input.project_id,
            user_id: context.authorization.ID
        }
        const data = this.taskUseCases.GetTasks(body.project_id, body.user_id);
        return data;
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
            editor_id: context.authorization.ID
        }
        const data = await this.taskUseCases.Update(body.ID, body.editor_id, body.name, body.status);
        return data;
    }

    public async Delete(_: any, { ID }: any, context: any){
        if(!context.authorization) throw new Error('Authorization denied');
        const body = {
            ID: ID,
            editor_id: context.authorization.ID
        }
        const data = await this.taskUseCases.Delete(body.ID, body.editor_id);
        return data;
    }
}