import { DatabaseRepository } from "./database.repository";
import CreateUser from "../Application/user.create";
import AuthUser from "../Application/user.auth";

export class UserResolver {

    public async CreateUser(_: any, args: any, _context: any): Promise<{ ID: string } | null> {
        const { name, email, password } = args.input;
        const userRepo = new DatabaseRepository();
        const result = CreateUser({ name, email, password }, userRepo);        
        if(!result) return null;
        return result;
    }

    public async AuthUser(_: any, args: any, _context: any){
        const { email, password } = args.input;
        const userRepo = new DatabaseRepository();
        const result = AuthUser({ email, password }, userRepo);
        if(!result) return null;
        return result;
    }
}