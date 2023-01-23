import { TaskRepository } from "../Domain/task.repository"
import { Task } from "../Domain/task.value";

export class UCTask {
    constructor(private readonly taskRepository: TaskRepository){}

    public async Create(nameArg: string, projectArg: string, authorArg: string): 
        Promise<{ 
            ID: string, 
            name: string, 
            status: boolean, 
            project_id: string
        }> {
        const task = new Task(nameArg, projectArg, authorArg);
        const taskCreated = await this.taskRepository.Create(task);
        const { ID, name, status, project_id } = taskCreated;
        return { ID, name, status, project_id };
    }

    public async Update(idArg: string, authorArg: string, nameArg?: string, statusArg?: boolean, projectArg?: string): 
        Promise<{ 
            ID: string, 
            name: string, 
            status: boolean, 
            project_id: string
        } | null> {
            
        const taskUpdated = await this.taskRepository.Update(idArg, authorArg, nameArg, statusArg, projectArg);
        if(!taskUpdated) return null;
        const { ID, name, status, project_id } = taskUpdated;
        return { ID, name, status, project_id };
    }
}