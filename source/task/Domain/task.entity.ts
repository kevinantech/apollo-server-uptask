export interface ITask {
    ID: string;
    name: string;
    status: boolean;
    created: Date;
    project_id: string;
    author_id: string;
}