import { ITask } from "./task.entity";

export interface TaskRepository {
    Create(task: ITask): Promise<ITask>    
    Update(ID: string,  editor_id: string, name?: string, status?: boolean, project_id?: string): Promise<ITask | null>
}