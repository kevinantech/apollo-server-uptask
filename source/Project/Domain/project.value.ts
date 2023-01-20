import { IProject } from "./project.entity";
import { v4 as uuid } from "uuid";

export default class Project implements IProject {
    ID: string;
    name: string;
    created: Date;
    AUTHOR_ID: string;
    constructor({ name, AUTHOR_ID }: {name: string, AUTHOR_ID: string}){
        this.ID = uuid();
        this.name = name;
        this.created = new Date();
        this.AUTHOR_ID = AUTHOR_ID;
    }
}