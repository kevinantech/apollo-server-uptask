import { UserRepository } from "../Domain/user.repository";
import { IUser } from "../Domain/user.entity";
import { User } from "../Domain/user.value";
import bcrypt from "bcryptjs"

const CreateUser = async ({ name, email, password }: { name: string, email: string, password: string}, userRepository: UserRepository) => {
    
    /**
     * Hash password
     */
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const userValue: IUser = new User({ name, email, password});
    const userCreated: IUser|null = await userRepository.Create(userValue);
    return userCreated;
}
export default CreateUser;