import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";
const UserSchema = new Schema<User>(
    {
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
        }
    },
    {   
        // Añade informacion de la fecha de creación y actualización en los documentos.
        timestamps: true,

        // No añade informacion de la version al docomento.
        versionKey: false
    }
)
const UserModel = model('Users', UserSchema);
export {UserModel};