import { ITask } from "./task.entity";

export interface TaskRepository {
    findTaskById(ID: string): Promise<ITask | null>  
    findTasksByProjectId(project_id: string): Promise<ITask[]> 
    registerTask(task: ITask): Promise<ITask | void> 
    updateTask(ID: string, name?: string, status?: boolean): Promise<ITask | null>
    deleteTask(ID: string): Promise<ITask | null>
    deleteTasksByProjectId(project_id: string): Promise<any>
}