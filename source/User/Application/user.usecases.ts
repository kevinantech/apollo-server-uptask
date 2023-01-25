import { UserRepository } from '../Domain/user.repository';
import { User } from '../Domain/user.value';
import { genToken } from './utils';
import bcrypt from 'bcryptjs';

export class UCUser {
	constructor(private readonly userRepository: UserRepository){}
    
	public async Create(name: string, email: string, password: string): Promise<{ ID: string }> {
    
		// Hash password
		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(password, salt);

		// Checks that the user's email does not exist..
		const userFound = await this.userRepository.findUserByEmail(email);
		if(userFound) throw new Error('The email is already registered');

		// Saves the user
		const user = new User(name, email, password);
		const response = await this.userRepository.registerUser(user);
		if(!response) throw new Error('Could not save');
		return response; 
	}


	public async Auth(email: string, password: string): Promise<{ token: string }> {

		// Checks that the user's email exists.
		const userFound = await this.userRepository.findUserByEmail(email);
		if(!userFound) throw new Error('Incorrect email');

		// Verifying that the user's password match 
		const isCorrectPassword = await bcrypt.compare(password, userFound.password);
		if(!isCorrectPassword) throw new Error('Incorrect password');

		// Gen token
		const { ID } = userFound;
		const token = genToken({ ID, email }, <string> process.env.SECRET, '2h');
		return { token };
	}
}