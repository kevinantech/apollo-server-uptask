import { UCUser } from "../Application/user.usecases";

export class UserResolver {
    
    constructor(private useCases: UCUser) {
        this.Auth = this.Auth.bind(this);
        this.Create = this.Create.bind(this);
    }

    public async Create(_: any, { input }: any) {
        const { name, email, password } = input;
        const data = await this.useCases.Create(name, email, password); 
        return data;
    }

    public async Auth(_: any, { input }: any) {
        const { email, password } = input;
        const data = await this.useCases.Auth(email, password);
        return data;
    }
}