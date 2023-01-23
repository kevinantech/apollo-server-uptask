import { UserRepository } from "../Domain/user.repository";
import { User } from "../Domain/user.value";
import { genToken } from "./utils";
import bcrypt from 'bcryptjs';

export class UCUser {
    constructor(private readonly userRepository: UserRepository){}
    
    public async Create(name: string, email: string, password: string): Promise<{ ID: string }> {
    
        // Hash password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const user = new User(name, email, password);
        const result = await this.userRepository.Create(user);
        return result;
    }

    public async Auth(email: string, password: string): Promise<{ token: string }> {

        // User's auth
        const result = await this.userRepository.Auth(email, password);
        if(!result) throw new Error('Could not authenticate');
    
        // Gen token
        const { ID } = result;
        const token = genToken({ ID, email }, <string> process.env.SECRET, '2h');
        return { token };
    }
}