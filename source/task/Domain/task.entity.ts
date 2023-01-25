export interface ITask {
    ID: string;
    name: string;
    status: boolean;
    created: Date;
    projectId: string;
    authorId: string;
}