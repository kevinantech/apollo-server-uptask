import { IUser } from "./user.entity";

export interface UserRepository {
    Create(user: IUser): Promise<IUser | null>
    Auth({}): Promise<{ token: string } | null>
}