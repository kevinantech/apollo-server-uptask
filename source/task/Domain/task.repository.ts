import { ITask } from "./task.entity";

export interface TaskRepository {
    findTaskById(ID: string): Promise<ITask | null>  
    saveTask(task: ITask): Promise<ITask | void> 
    updateTask(ID: string, name?: string, status?: boolean): Promise<ITask | null>
}