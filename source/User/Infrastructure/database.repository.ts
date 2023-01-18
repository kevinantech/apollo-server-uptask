import { IUser } from "../Domain/user.entity";
import { UserRepository } from "../Domain/user.repository";
import { UserModel } from "./user.schema";

export class DatabaseRepository implements UserRepository {

    async Create(user: IUser): Promise<IUser | null> {
        const userModel = new UserModel(user);
        try {
            const userSaved = await userModel.save()
            return userSaved;
        } catch(e){ 
            console.log(e);
            return null;
        }
    }

    async Auth({}: {}): Promise<{ token: string; } | null> {
        return await null;
    }
}