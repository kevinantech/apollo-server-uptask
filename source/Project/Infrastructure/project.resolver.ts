import { UCProject } from "../Application/project.usecases";

export class ProjectResolver {
    constructor(private projectUseCases: UCProject){
        this.GetAll = this.GetAll.bind(this);
    }

    public async GetAll(_: any, args: any, _context: any): Promise<{ ID: string, name: string }[] | null> {
        //if (!context.Auth) return null;

        const author_id: string = args.AUTHOR_ID;
        const result = await this.projectUseCases.GetAll(author_id);
        return result;
    }

}