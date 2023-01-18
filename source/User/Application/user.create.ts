import { UserRepository } from "../Domain/user.repository";
import { User } from "../Domain/user.value";
import bcrypt from "bcryptjs"

const CreateUser = async ({ name, email, password }: { name: string, email: string, password: string}, userRepository: UserRepository): Promise<{ ID: string } | null> => {
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const userValue = new User({ name, email, password});
    const result = await userRepository.Create(userValue);
    return result;
}

export default CreateUser;