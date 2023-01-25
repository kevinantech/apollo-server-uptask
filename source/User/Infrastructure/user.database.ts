import { IUser } from '../Domain/user.entity';
import { UserRepository } from '../Domain/user.repository';
import { UserModel } from './user.model';

export class UserDatabaseRepository implements UserRepository {

	async findUserByEmail(email: string): Promise<IUser | null> {
		const userFound = await UserModel.findOne({ email });
		return userFound;
	}

	async registerUser(user: IUser): Promise<{ ID: string } | void> {
		try {
			const userModel = new UserModel(user);
			const { ID } = await userModel.save();
			return { ID };
		} catch(e) { console.error({ at: `${__dirname}, => registerUser`, error: e }); }
	}
}