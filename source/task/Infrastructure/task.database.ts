import { ITask } from "../Domain/task.entity";
import { TaskRepository } from "../Domain/task.repository";
import { TaskModel } from "./task.model";

export class TaskDatabaseRepository implements TaskRepository {
    
    async Create(task: ITask): Promise<ITask> {
        try {
            const taskModel = new TaskModel(task);
            const savedTask = await taskModel.save();
            return savedTask;
        } catch (e) {
            console.error({ at: `${__dirname} => Create`, error: e });
            throw new Error('Could not create');
        } 
    }

    async Update(ID: string, editor_id: string, name?: string , status?: boolean, project_id?: string): Promise<ITask | null> {
        const filter = { ID };
        const changes = { name, status, project_id };

        // Checks that the task exists
        const task = await TaskModel.findOne(filter);
        if(!task) throw new Error('The task does not exist');

        // Checks that the editor match with the task autor
        if(editor_id != task.author_id) throw new Error('You dont have permissions')
        
        // Update the task
        const updatedTask = await TaskModel.findOneAndUpdate(filter, changes, { new: true })
        return updatedTask; 
    }
}