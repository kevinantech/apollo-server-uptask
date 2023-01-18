import { UserRepository } from "../Domain/user.repository";
import { genToken } from "./utils";

const AuthUser = async ({ email, password }: { email: string, password: string}, userRepository: UserRepository): Promise<{ token: string } | null> => {

    const authData = await userRepository.Auth({ email, password });
    if(!authData) return null;

    const { ID } = authData;
    const token = genToken({ ID, email }, <string> process.env.SECRET, '2h');
    return {token};
}

export default AuthUser;