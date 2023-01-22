import { ITask } from "./task.entity";

export interface TaskRepository {
    Create(task: ITask): Promise<{ID:string, name:string, status:boolean, PROJECT_ID:string} | null>

}