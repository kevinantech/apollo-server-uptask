import { UserModel } from "../../models/user.model";
import type { AuthUserInput } from "../../../types";
import type { User } from "../../../types";
import { genToken } from "../../utils";
import bcrypt from 'bcryptjs';
import "dotenv/config";

export class UserResolver {
  
  constructor(){}

  static async create(_: any, { input }: { input: User }) {
    const { email, password } = input;
    const exist = await UserModel.exists({ email });
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
  }

  static async auth(_: any, {input}: {input: AuthUserInput}) {
    const { email, password } = input;
    const exist = await UserModel.findOne({email});
    if (!exist) {
      throw new Error("The user does not exits");
    }
    const isCorrectPassword: boolean = await bcrypt.compare(password, exist.password);
    if(!isCorrectPassword) {
      throw new Error("The password is incorrect");
    }
    const token: string = genToken(exist, <string> process.env.SECRET, "2h");
    return { token };
  }
}