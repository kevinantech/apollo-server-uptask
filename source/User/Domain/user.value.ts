import { IUser } from './user.entity';
import { v4 as uuid } from 'uuid';

export class User implements IUser {
	ID: string;
	name: string;
	email: string;
	password: string;
	registration: Date;
	constructor( name: string, email: string, password: string){
		this.ID = uuid();
		this.name = name;
		this.email = email;
		this.password = password;
		this.registration = new Date();
	}
}