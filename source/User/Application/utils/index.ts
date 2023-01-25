import jwt from 'jsonwebtoken';

const genToken = ({ ID, email }: { ID: string, email: string }, secret: string, expiration: string) => {
    return jwt.sign({ ID, email }, secret, { expiresIn: expiration });
};
export {genToken};