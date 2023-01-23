import { IUser } from "./user.entity";

export interface UserRepository {
    findUserByEmail(email: string): Promise<IUser | null>
    saveUser(user: IUser): Promise<{ ID: string } | void>
}