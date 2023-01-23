import { IUser } from "../Domain/user.entity";
import { UserRepository } from "../Domain/user.repository";
import { UserModel } from "./user.model";
import bcrypt from "bcryptjs";

export class UserDatabaseRepository implements UserRepository {

    async Create(user: IUser): Promise<{ ID: string }> {

        // Verifying that the user's email does not exist.
        const exists = await UserModel.exists({ email: user.email });
        if(exists) throw new Error('The email already exists');

        try {
            const userModel = new UserModel(user);
            const { ID } = await userModel.save();
            return { ID };
        } catch(e) { 
            console.error({ at: `${__dirname}, => Create`, error: e });
            throw new Error('Could not create');
        }
    }

    async Auth(email: string, password: string): Promise<{ ID: string }> {
        const filter = { email };

        // Verifying that the user's email exists
        const user = await UserModel.findOne(filter);
        if(!user) throw new Error('The email does not exists');
        
        // Verifying that the user's password match 
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword) throw new Error('Incorrect password');

        return { ID: user.ID };
    }
}