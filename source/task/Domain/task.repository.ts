import { ITask } from "./task.entity";

export interface TaskRepository {
    Create(task: ITask): Promise<ITask | null>    
    Update(ID: string,  author_ID: string, name?: string, status?: boolean, project_ID?: string): Promise<ITask | null>
}