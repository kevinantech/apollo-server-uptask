import { UCProject } from "../Application/project.usecases";

export class ProjectResolver {
    constructor(private projectUseCases: UCProject){
        this.GetAll = this.GetAll.bind(this);
        this.Create = this.Create.bind(this);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);
    }

    public async GetAll(_: any, __: any, context: any): Promise<{ID: string, name: string}[] | null> {

        if (!context.Auth) return null;

        const AUTHOR_ID = <string> context.Auth.ID;
        const result = await this.projectUseCases.GetAll(AUTHOR_ID);
        return result;
    }
    
    public async Create(_: any, args: any, context: any): Promise<{ID: string} | null> {

        if (!context.Auth) return null;

        const result = await this.projectUseCases.Create({
            name: <string> args.name,
            AUTHOR_ID: <string> context.Auth.ID
        });
        return result;
    }

    public async Update(_: any, args: any, context: any): Promise<{name: string} | null> {

        if (!context.Auth) return null;

        const result = await this.projectUseCases.Update({ 
            ID: <string> args.input.ID,
            name: <string> args.input.name,
            CURRENT_EDITOR: <string> context.Auth.ID
         });
         
        return result;
    }

    public async Delete(_: any, args: any, context: any): Promise<string | null> {

        if (!context.Auth) return null;
        
        const result = await this.projectUseCases.Delete({ 
            ID: <string> args.ID,
            CURRENT_EDITOR: <string> context.Auth.ID
         });
         
        return result;
    }
}