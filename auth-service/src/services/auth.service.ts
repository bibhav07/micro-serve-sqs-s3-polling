import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/hash";
import env from "../env";

export const register = async ( name: string, email : string, password : string ) => {
    const isUser = await prisma.serviceuser.findUnique({where : { email }});
    if( isUser) {
        throw new Error("User already exists");
    };

    const hashedPassword = await hashPassword(password);

    const user = await prisma.serviceuser.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return { id: user.id, name: user.name, email: user.email };
};


export const login = async (email : string, password : string) => {
    const user = await prisma.serviceuser.findUnique( {  where : {email} });
    if (!user) {
        throw new Error("User not found");
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
        throw new Error("Invalid password");
    };

    const token = jwt.sign( { userId: user.id },  env.JWT_SECRET, { expiresIn: '1d' } );

    return {token};
}