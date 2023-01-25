import { IProject } from './project.entity';
import { v4 as uuid } from 'uuid';

export default class Project implements IProject {
    ID: string;
    name: string;
    created: Date;
    authorId: string;
    constructor(name: string, authorId: string){
        this.ID = uuid();
        this.name = name;
        this.created = new Date();
        this.authorId = authorId;
    }
}