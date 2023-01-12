import UserModel from "../models/user.model";
const resolvers = {
    Query: {
      
    },
    Mutation: {
      createUser: async (_parent: any, {input}: any) => {
        const { email, /* password */ } = input;
        const exist = await UserModel.exists({email});
        if (exist) {
          throw new Error("The user already exist");
        }
        try {
          const newUser = new UserModel(input);
          await newUser.save();
        } catch (e) {
          console.log(e)
        }
        return "The user has successfully registered"
      }
    }
};
export default resolvers;