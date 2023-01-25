import { ITask } from '../Domain/task.entity';
import { TaskRepository } from '../Domain/task.repository';
import { TaskModel } from './task.model';

export class TaskDatabaseRepository implements TaskRepository {

    async findTasksByProjectId(projectId: string): Promise<ITask[]> {
        const tasks = await TaskModel.find({ projectId }, { _id: 0, created: 0, authorId: 0 }); 
        return tasks;
    }
    
    async findTaskById(ID: string): Promise<ITask | null> {
        const taskFound = TaskModel.findOne({ ID });
        return taskFound;
    }

    async registerTask(task: ITask): Promise<ITask | void> {
        try {
            const taskModel = new TaskModel(task);
            const savedTask = await taskModel.save();
            return savedTask;
        } catch (e) { console.error({ at: `${__dirname} => registerTask`, error: e }); } 
    }

    async updateTask(ID: string, name?: string, status?: boolean): Promise<ITask | null> {
        const updatedTask = TaskModel.findOneAndUpdate({ ID }, { name, status }, { new: true });
        return updatedTask;
    }

    async deleteTask(ID: string): Promise<ITask | null> {
        const deletedTask = await TaskModel.findOneAndDelete({ ID });
        return deletedTask;   
    }

    async deleteTasksByProjectId(projectId: string): Promise<any> {
        const deletedTasks = await TaskModel.deleteMany({ projectId });
        return deletedTasks;
    }
}