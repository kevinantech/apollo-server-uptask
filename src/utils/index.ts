import { Document, Types } from 'mongoose';
import type { User } from '../../types';
import jwt from 'jsonwebtoken';

const genToken = (user: Document<unknown, any, User> & User & {_id: Types.ObjectId}, secret: string, expiration: string) => {
    const { _id, email } = user;   
    const id = _id.toString();
    return jwt.sign({ id, email }, secret, { expiresIn: expiration });
}
export {genToken};