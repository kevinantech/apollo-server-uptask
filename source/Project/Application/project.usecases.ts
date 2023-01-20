import { IProject } from "../Domain/project.entity";
import { ProjectRepository } from "../Domain/project.repository";
import Project from "../Domain/project.value";

export class UCProject {
    constructor(private readonly projectRepository: ProjectRepository){}

    public async GetAll(AUTHOR_ID: string): Promise<IProject[] | null> {
        const result = await this.projectRepository.GetAll(AUTHOR_ID);
        return result;
    }

    public async Create({ name, AUTHOR_ID }: { name: string, AUTHOR_ID: string}): Promise<{ID: string} | null> {
        const projetvalue = new Project({ name, AUTHOR_ID });
        const result = await this.projectRepository.Create(projetvalue);
        return result;
    }

    public async Update({ ID, name, CURRENT_EDITOR }: {ID: string, name: string, CURRENT_EDITOR: string}): Promise<{name:string} | null>{
        const result = await this.projectRepository.Update({ ID, name, CURRENT_EDITOR });
        return result;
    }

    public async Delete({ ID, CURRENT_EDITOR }: {ID: string, CURRENT_EDITOR: string}): Promise<string | null>{
        const result = this.projectRepository.Delete({ ID, CURRENT_EDITOR});
        return result;
    }
}