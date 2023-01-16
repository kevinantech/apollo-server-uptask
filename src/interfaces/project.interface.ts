import { Types } from "mongoose"
export interface Project {
    name: string,
    author: Types.ObjectId
}