import { ITask } from './task.entity';
import { v4 as uuid } from 'uuid';

export class Task implements ITask {
    ID: string;
    name: string;
    status: boolean;
    created: Date;
    projectId: string;
    authorId: string;
    constructor(name:string, projectId:string, authorId:string){
        this.ID = uuid();
        this.name = name;
        this.status = false;
        this.created = new Date();
        this.projectId = projectId;
        this.authorId = authorId;
    }

}