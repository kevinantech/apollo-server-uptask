//TODO: Typing createUser params & modularize.
import UserModel from "../models/user.model";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";

const genToken = (user: any, secret: string, expiration: string) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, secret, { expiresIn: expiration });
}

const resolvers = {
    Query: {
      
    },
    Mutation: {
      createUser: async (_parent: any, {input}: any) => {
        const { email, password } = input;
        const exist = await UserModel.exists({email});
        if (exist) {
          throw new Error("The user already exist");
        }
        try {
          const salt = await bcrypt.genSalt(10);
          input.password = await bcrypt.hash(password, salt);
          const newUser = new UserModel(input);
          await newUser.save();
        } catch (e) {
          console.log(e);
        }
        return "The user has successfully registered";
      },
      authUser: async (_parent: any, {input}: any) => {
        const { email, password } = input;
        const exist = await UserModel.findOne({email});
        if (!exist) {
          throw new Error("The user does'nt exits");
        }
        const isCorrectPassword: boolean = await bcrypt.compare(password, exist.password);
        if(!isCorrectPassword) {
          throw new Error("The password is incorrect")
        }
        const token: string = genToken(exist, <string> process.env.SECRET, "2h");
        return { token };
      }
    }
};
export default resolvers;