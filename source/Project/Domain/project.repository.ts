import { IProject } from "./project.entity"

export interface ProjectRepository {
    GetAll(AUTHOR_ID: string): Promise<IProject[]>
    Create(name: string): Promise<{ID: string}>
    Update({ ID, name }: { ID: string, name: string}): Promise<{ name: string }>
    Delete(ID: string): Promise<{ ID: string}>
}