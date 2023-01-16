import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authToken = (token: any) => {
  if (token) {
    try {
      const userAuth = jwt.verify(token, <string> process.env.SECRET);
      return userAuth;
    } catch (e) {}
  }
  return undefined;
}
export {authToken};