import { ITask } from "./task.entity";
import { v4 as uuid } from "uuid";

export class Task implements ITask {
    ID: string;
    name: string;
    status: boolean;
    created: Date;
    project_ID: string;
    author_ID: string
    constructor(name:string, project_ID:string, author_ID:string){
        this.ID = uuid();
        this.name = name;
        this.status = false;
        this.created = new Date();
        this.project_ID = project_ID;
        this.author_ID = author_ID;
    }
}