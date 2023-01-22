import jwt from 'jsonwebtoken';
import 'dotenv/config';

const AuthToken = (token: string | undefined) => {
  if (token) {
    try {
      const userPayload = jwt.verify(token, <string> process.env.SECRET);
      return userPayload;
    } catch (e) {}
  }
  return null;
}
export {AuthToken};