import { UserRepository } from "../Domain/user.repository";
import { User } from "../Domain/user.value";
import { genToken } from "./utils";
import bcrypt from 'bcryptjs';

export class UCUser {
    constructor(private readonly userRepository: UserRepository){}

    public async Auth({ email, password }: { email: string, password: string}): Promise<{ token: string } | null> {

        // User's auth
        const authData = await this.userRepository.Auth({ email, password });
        if(!authData) return null;
    
        // Gen token
        const { ID } = authData;
        const token = genToken({ ID, email }, <string> process.env.SECRET, '2h');
        return {token};
    }

    public async Create({ name, email, password }: { name: string, email: string, password: string}): Promise<{ ID: string } | null> {
    
        // Hash password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
    
        const userValue = new User({ name, email, password });
        
        // Validate data
        const result = await this.userRepository.Create(userValue);
        return result;
    }
}