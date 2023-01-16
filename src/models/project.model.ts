import { Schema, model } from "mongoose";
import { Project } from "../interfaces/project.interface";

const ProjectSchema = new Schema<Project>(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
const ProjectModel = model('Projects', ProjectSchema);
export {ProjectModel};