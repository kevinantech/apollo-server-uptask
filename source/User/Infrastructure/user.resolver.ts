import { UCUser } from "../Application/user.usecases";

//TODO: Use class-validator
export class UserResolver {
    
    constructor(private useCases: UCUser){
        this.Auth = this.Auth.bind(this);
        this.Create = this.Create.bind(this);
    }

    public async Create(_: any, args: any): Promise<{ ID: string } | null> {
        const { name, email, password } = args.input;
        const result = await this.useCases.Create({ name, email, password });        
        if(!result) return null;
        return result;
    }

    public async Auth(_: any, args: any){
        const { email, password } = args.input;
        const result = await this.useCases.Auth({ email, password });
        if(!result) return null;
        return result;
    }
}