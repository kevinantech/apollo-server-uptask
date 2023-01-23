import { UCProject } from "../Application/project.usecases";

export class ProjectResolver {
    constructor(private projectUseCases: UCProject) {
        this.GetAll = this.GetAll.bind(this);
        this.Create = this.Create.bind(this);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);
    }

    public async GetAll(_: any, __: any, context: any) {
        if(!context.authorization) throw new Error('Authorization denied');
        const author_id: string = context.authorization.ID;
        const data = await this.projectUseCases.GetAll(author_id);
        return data;
    }
    
    public async Create(_: any, { input }: any, context: any) {
        if(!context.authorization) throw new Error('Authorization denied');
        const body = {
            name: input.name,
            author_id: context.authorization.ID
        };
        const data = await this.projectUseCases.Create(body.name, body.author_id);
        return data;
    }

    public async Update(_: any, { input }: any, context: any) {
        if(!context.authorization) throw new Error('Authorization denied');
        const body = {
            ID: input.ID,
            name: input.name,
            editor_id: context.authorization.ID
        }
        const data = await this.projectUseCases.Update(body.ID, body.name, body.editor_id);
        return data;
    }

    public async Delete(_: any, { ID }: any, context: any) {
        if(!context.authorization) throw new Error('Authorization denied');
        const body = {
            ID,
            editor_id: context.authorization.ID
        };
        const data = await this.projectUseCases.Delete(body.ID, body.editor_id)
        return data;
    }
}