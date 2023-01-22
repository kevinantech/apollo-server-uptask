import { ITask } from "../Domain/task.entity";
import { TaskRepository } from "../Domain/task.repository";
import { TaskModel } from "./task.model";

//TODO: Implement error handler.

export class TaskDatabaseRepository implements TaskRepository {
    
    async Create(task: ITask): Promise<ITask | null> {
        try {
            const taskModel = new TaskModel(task);
            const taskSaved = await taskModel.save();
            return taskSaved;
        } catch (e) {
            console.error({
                at: `${__dirname} => Create`,
                error: e 
            });
            return null;
        }
    }
    
    async Update(ID: string, author_ID: string, name?: string , status?: boolean, project_ID?: string): Promise<ITask | null> {
        const filter = { ID };
        const changes = { name, status, project_ID };

        // Checks that the task exists
        const task = await TaskModel.findOne(filter);
        if(!task) throw new Error('The task does not exist');

        // Checks that  the authenticated user match with the task autor
        if(author_ID != task.author_ID) throw new Error('You dont have permissions')
        
        try {
            const result = await TaskModel.findOneAndUpdate(filter, changes, { new: true });
            if(!result) throw new Error('Could not update');
            return result;
        } catch (e) {
            console.error({
                at: `${__dirname} => Create`,
                error: e 
            });
            return null;
        }
    }    
   
}