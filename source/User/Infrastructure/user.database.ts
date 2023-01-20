import { IUser } from "../Domain/user.entity";
import { UserRepository } from "../Domain/user.repository";
import { UserModel } from "./user.model";
import bcrypt from "bcryptjs";

export class UserDatabaseRepository implements UserRepository {

    async Create(user: IUser): Promise<{ID: string} | null> {

        try {
            // Verifying that the user's email dont exist.
            const exists = await UserModel.exists({ email: user.email });
            if(exists) throw new Error('The email already exists');

            const userModel = new UserModel(user);
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
        
        try {
            // Verifying that the user's email exists
            const exists = await UserModel.findOne({email});
            if(!exists) throw new Error('The email does not exists');
            
            // Verifying that the user's password match 
            const isCorrectPassword = await bcrypt.compare(password, exists.password);
            if(!isCorrectPassword) throw new Error('Incorrect password');
    
            return { ID: exists.ID };
        } catch (e) {
            console.log({
                at: `${__dirname}, UserDatabaseRepository.Auth`,
                message: e
            });
            return null;
        }
    }
}