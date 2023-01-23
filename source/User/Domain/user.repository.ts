import { IUser } from "./user.entity";

export interface UserRepository {
    Create(user: IUser): Promise<{ ID: string }>
    Auth(email: string, password: string): Promise<{ ID: string }>
}