import { ITask } from "./task.entity";
import { v4 as uuid } from "uuid";

export class Task implements ITask {
    ID: string;
    name: string;
    status: boolean;
    created: Date;
    PROJECT_ID: string;
    constructor({ name, PROJECT_ID }: {name:string, PROJECT_ID:string}){
        this.ID = uuid();
        this.name = name;
        this.status = false;
        this.created = new Date();
        this.PROJECT_ID = PROJECT_ID;;
    }
}