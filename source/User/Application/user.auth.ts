import { UserRepository } from "../Domain/user.repository";
/* import { User } from "../Domain/user.value"; */

/**
 * FIXME: Communicate with infrastructure to receive if the email exist and if the 
 * password match with the registered user.
 * TODO: Communicate with infrastructure wihtout breaking the clean architecture.
 */
const AuthUser = async (/* { email, password }: { email: string, password: string}, */ _userRepository: UserRepository) => {
    
}
export default AuthUser;