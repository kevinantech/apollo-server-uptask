import { IUser } from "../Domain/user.entity";
import { UserRepository } from "../Domain/user.repository";
import { UserModel } from "./user.model";
import bcrypt from "bcryptjs";

export class DatabaseRepository implements UserRepository {

    async Create(user: IUser): Promise<{ ID: string } | null> {

        // Verifying that the user's email dont exist.
        const exist = await UserModel.exists({ email: user.email });
        if(exist) return null;

        const userModel = new UserModel(user);
        try {
            const { ID } = await userModel.save()
            return { ID };
        } catch(e){ 
            console.log({
                at: `${__dirname}, DatabaseRepository.Create`,
                message: e
            });
            return null;
        }
    }

    async Auth({ email, password }: { email: string; password: string; }): Promise<{ ID: string } | null> {
        
        // Verifying that the user's email exists
        const exist = await UserModel.findOne({email});
        if(!exist) return null;
        
        // Verifying that the user's password match 
        const isCorrectPassword = await bcrypt.compare(password, exist.password);
        if(!isCorrectPassword) return null;

        return { ID: exist.ID };
    }
}