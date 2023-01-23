import { IProject } from "./project.entity";
import { v4 as uuid } from "uuid";

export default class Project implements IProject {
    ID: string;
    name: string;
    created: Date;
    author_id: string;
    constructor(name: string, author_id: string){
        this.ID = uuid();
        this.name = name;
        this.created = new Date();
        this.author_id = author_id;
    }
}