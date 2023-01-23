import { IProject } from "./project.entity"

export interface ProjectRepository {
    GetAll(author_id: string): Promise<IProject[]>
    Create(Project: IProject): Promise<IProject>
    Update(ID: string, name: string, editor_id: string): Promise<IProject | null>
    Delete(ID: string, editor_id: string): Promise<IProject | null>
}