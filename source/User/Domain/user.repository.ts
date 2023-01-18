import { IUser } from "./user.entity";

export interface UserRepository {
    Create(user: IUser): Promise<{ ID: string } | null>
    Auth({ email, password }: { email: string, password: string }): Promise<{ ID: string } | null>
}