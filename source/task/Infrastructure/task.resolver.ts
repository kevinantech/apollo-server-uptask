import { UCTask } from "../Application/task.usecases";

export class TaskResolver {

    constructor(private taskUseCases: UCTask){
        this.Create = this.Create.bind(this);
    }

    public async Create(_:any, {input}:any, context:any){

        if (!context.authorization) return "Authorization denied";
        const result = await this.taskUseCases.Create({
            name: input.name,
            PROJECT_ID: input.PROJECT_ID
        })
        return result;
    }
}