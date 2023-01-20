import { IProject } from "./project.entity"

export interface ProjectRepository {
    GetAll(AUTHOR_ID: string): Promise<IProject[] | null>
    Create(Project: IProject): Promise<{ID: string} | null>
    Update({ ID, name, CURRENT_EDITOR }: {ID: string, name: string, CURRENT_EDITOR: string}): Promise<{name: string} | null>
    Delete({ ID, CURRENT_EDITOR }: {ID: string, CURRENT_EDITOR: string}): Promise<string | null>
}