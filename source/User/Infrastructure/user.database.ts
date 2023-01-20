import { IUser } from "../Domain/user.entity";
import { UserRepository } from "../Domain/user.repository";
import { UserModel } from "./user.model";
import bcrypt from "bcryptjs";

export class UserDatabaseRepository implements UserRepository {

    async Create(user: IUser): Promise<{ID: string} | null> {

        // Verifying that the user's email dont exist.
        const exists = await UserModel.exists({ email: user.email });
        if(exists) return null;

        const userModel = new UserModel(user);
        try {
            const { ID } = await userModel.save()
            return { ID };
        } catch(e) { 
            console.log({
                at: `${__dirname}, UserDatabaseRepository.Create`,
                message: e
            });
            return null;
        }
    }

    async Auth({ email, password }: {email: string; password: string;}): Promise<{ID: string} | null> {
        
        // Verifying that the user's email exists
        const exists = await UserModel.findOne({email});
        if(!exists) return null;
        
        // Verifying that the user's password match 
        const isCorrectPassword = await bcrypt.compare(password, exists.password);
        if(!isCorrectPassword) return null;

        return { ID: exists.ID };
    }
}