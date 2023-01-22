import { SharedRepository } from "../../shared/Domain/shared.repository";
import { TaskRepository } from "../Domain/task.repository"
import { Task } from "../Domain/task.value";

export class UCTask {
    constructor(private readonly taskRepository: TaskRepository, private readonly sharedRepository: SharedRepository){}

    public async Create({ name, PROJECT_ID }: {name:string, PROJECT_ID:string}): Promise<{ID:string, name:string, status:boolean, PROJECT_ID:string} | null> {
        
        // Check that project exists
        const projectExists:boolean = await this.sharedRepository.Exists({ ID: PROJECT_ID }, { Project: true }); 
        if(!projectExists) return null;

        const task = new Task({name, PROJECT_ID});
        const result = await this.taskRepository.Create(task);

        return result;
    }
}
