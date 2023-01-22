import { UCProject } from "../Application/project.usecases";

export class ProjectResolver {
    constructor(private projectUseCases: UCProject){
        this.GetAll = this.GetAll.bind(this);
        this.Create = this.Create.bind(this);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);
    }

    public async GetAll(_: any, __: any, context: any): Promise<{ID: string, name: string}[] | null> {

        if (!context.authorization) return null;

        const AUTH_ID: string = context.authorization.ID;
        const result = await this.projectUseCases.GetAll(AUTH_ID);
        return result;
    }
    
    public async Create(_: any, { input }: any, context: any): Promise<{ID: string, name: string} | null> {

        if (!context.authorization) return null;
        const AUTH_ID: string = context.authorization.ID
        const result = await this.projectUseCases.Create({
            name: <string> input.name,
            AUTHOR_ID: AUTH_ID
        });
        return result;
    }

    public async Update(_: any, { input }: any, context: any): Promise<{ID: string, name: string} | null> {

        if (!context.authorization) return null;
        const AUTH_ID: string = context.authorization.ID;
        const result = await this.projectUseCases.Update({ 
            ID: <string> input.ID,
            name: <string> input.name,
            CURRENT_EDITOR: AUTH_ID
        });
         
        return result;
    }

    public async Delete(_: any, args: any, context: any): Promise<{ID: string} | null> {

        if (!context.authorization) return null;
        
        const result = await this.projectUseCases.Delete({ 
            ID: <string> args.ID,
            CURRENT_EDITOR: <string> context.authorization.ID
        });
         
        return result;
    }
}