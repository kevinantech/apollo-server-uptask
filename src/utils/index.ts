import { Document, Types } from 'mongoose';
import { User } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';

const genToken = (user: Document<unknown, any, User> & User & {_id: Types.ObjectId}, secret: string, expiration: string) => {
    const { id, email } = user;
    return jwt.sign({ id, email }, secret, { expiresIn: expiration });
}
export {genToken};