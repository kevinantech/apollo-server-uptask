import { ITask } from "./task.entity";
import { v4 as uuid } from "uuid";

export class Task implements ITask {
    ID: string;
    name: string;
    status: boolean;
    created: Date;
    project_id: string;
    author_id: string
    constructor(name:string, project_id:string, author_id:string){
        this.ID = uuid();
        this.name = name;
        this.status = false;
        this.created = new Date();
        this.project_id = project_id;
        this.author_id = author_id;
    }
}