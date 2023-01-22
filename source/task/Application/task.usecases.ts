import { TaskRepository } from "../Domain/task.repository"
import { Task } from "../Domain/task.value";

export class UCTask {
    constructor(private readonly taskRepository: TaskRepository){}

    public async Create(nameInput: string, projectInput: string, authorInput: string): 
        Promise<{ 
            ID: string, 
            name: string, 
            status: boolean, 
            project_ID: string
        } | null> {

        const task = new Task(nameInput, projectInput, authorInput);
        const taskCreated = await this.taskRepository.Create(task);
        if(!taskCreated) return null;
        const { ID, name, status, project_ID } = taskCreated;
        return { ID, name, status, project_ID };
    }

    public async Update(ID_Input: string, authorInput: string, nameInput?: string, statusInput?: boolean, projectInput?: string): 
        Promise<{ 
            ID: string, 
            name: string, 
            status: boolean, 
            project_ID: string
        } | null> {

        const taskUpdated = await this.taskRepository.Update(ID_Input, authorInput, nameInput, statusInput, projectInput);
        if(!taskUpdated) return null;
        const { ID, name, status, project_ID } = taskUpdated;
        return { ID, name, status, project_ID };
    }
}