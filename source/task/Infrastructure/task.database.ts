import { ITask } from "../Domain/task.entity";
import { TaskRepository } from "../Domain/task.repository";
import { TaskModel } from "./task.model";

export class TaskDatabaseRepository implements TaskRepository {
    
    async findTaskById(ID: string): Promise<ITask | null> {
        const taskFound = TaskModel.findOne({ ID });
        return taskFound;
    }

    async saveTask(task: ITask): Promise<ITask | void> {
        try {
            const taskModel = new TaskModel(task);
            const savedTask = await taskModel.save();
            return savedTask;
        } catch (e) { console.error({ at: `${__dirname} => Create`, error: e }) } 
    }

    async updateTask(ID: string, name?: string, status?: boolean): Promise<ITask | null> {
        const updatedTask = TaskModel.findOneAndUpdate({ ID }, { name, status }, { new: true });
        return updatedTask;
    }
} 