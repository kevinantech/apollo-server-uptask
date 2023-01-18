import { IUser } from "./user.entity";
import { v4 as uuid } from "uuid";

export class User implements IUser {
    ID: string;
    name: string;
    email: string;
    password: string;
    constructor({ name, email, password }: { name: string, email:string, password: string }){
        this.ID = uuid();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}