import { Schema, model } from "mongoose";
import { ITask } from "../Domain/task.entity";

const TaskSchema = new Schema<ITask>(
    {
        ID: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: false
        },
        created: {
            type: Date,
            required: true
        },
        project_id: {
            type: String,
            required: true
        },
        author_id: {
            type: String,
            required: true
        }
    }, 
    {
        versionKey: false
    }
);

const TaskModel = model('Tasks', TaskSchema);
export { TaskModel };