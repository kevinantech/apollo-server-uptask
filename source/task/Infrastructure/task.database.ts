import { ITask } from "../Domain/task.entity";
import { TaskRepository } from "../Domain/task.repository";
import { TaskModel } from "./task.model";


export class TaskDatabaseRepository implements TaskRepository {

    async Create(task: ITask): Promise<{ID:string, name:string, status:boolean, PROJECT_ID:string} | null> {
        const taskModel = new TaskModel(task);
        try {
            const { ID, name, status, PROJECT_ID } = await taskModel.save();
            return { ID, name, status, PROJECT_ID };
        } catch (e) {
            console.log({
                at: `${__dirname} ProjectDatabaseRepository.GetAll`,
                message: e 
            });
            return null;
        }
    }
    
}