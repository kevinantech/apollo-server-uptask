import { IProject } from './project.entity';

export interface ProjectRepository {
	findProjectById(ID: string): Promise<IProject | null>
	findProjectsByAuthorId(authorId: string): Promise<IProject[]>
	registerProject(Project: IProject): Promise<IProject | void>
	updateProject(ID: string, name: string): Promise<IProject | null>
	deleteProject(ID: string): Promise<IProject | null>
}