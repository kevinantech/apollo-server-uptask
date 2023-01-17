import { Schema, model } from "mongoose";
import type { Project } from "../../types";

const ProjectSchema = new Schema<Project>(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        author_id: {
            type: String,
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