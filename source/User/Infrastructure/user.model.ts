import { Schema, model } from "mongoose";
import { IUser } from "../Domain/user.entity";
const UserSchema = new Schema<IUser>(
    {
        ID: {
            type: String,
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
        }
    },
    {   
        // No asigna un ID por defecto a los documentos.
        _id: false, id: false,
        // Añade informacion de la fecha de creación y actualización en los documentos.
        timestamps: true,
        // No añade informacion de la version al docomento.
        versionKey: false
    }
)
const UserModel = model('Users', UserSchema);
export {UserModel};