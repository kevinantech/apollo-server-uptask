import { ProjectRepository } from "../Domain/project.repository";

export class UCProject {
    constructor(private readonly projectRepository: ProjectRepository){}

    public async GetAll(AUTHOR_ID: string): Promise<{ ID: string, name: string }[]> {
        const result = await this.projectRepository.GetAll(AUTHOR_ID);

        /**
         * TODO: Format data { ID, name }[]. Not _id, AUTHOR_ID, timestaps.
         * Go to Application/utils to define helper.
         */
        return result;
    }
}