import { ITask } from "../Domain/task.entity";
import { TaskRepository } from "../Domain/task.repository";
import { TaskModel } from "./task.model";

export class TaskDatabaseRepository implements TaskRepository {

    async findTasksByProjectId(project_id: string): Promise<ITask[]> {
        const tasks = await TaskModel.find({ project_id }, { _id: 0, created: 0, author_id: 0 }); 
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
        } catch (e) { console.error({ at: `${__dirname} => Create`, error: e }) } 
    }

    async updateTask(ID: string, name?: string, status?: boolean): Promise<ITask | null> {
        const updatedTask = TaskModel.findOneAndUpdate({ ID }, { name, status }, { new: true });
        return updatedTask;
    }

    async deleteTask(ID: string): Promise<ITask | null> {
        const deletedTask = await TaskModel.findOneAndDelete({ ID });
        return deletedTask;   
    }

    async deleteTasksByProjectId(project_id: string): Promise<any> {
        const deletedTasks = await TaskModel.deleteMany({ project_id });
        return deletedTasks;
    }
}