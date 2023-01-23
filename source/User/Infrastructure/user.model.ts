import { Schema, model } from "mongoose";
import { IUser } from "../Domain/user.entity";
const UserSchema = new Schema<IUser>(
    {
        ID: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            trim: true
        },
        registration: {
            type: Date,
            requiere: true
        }
    },
    {   
        versionKey: false
    }
)
const UserModel = model('Users', UserSchema);
export { UserModel };