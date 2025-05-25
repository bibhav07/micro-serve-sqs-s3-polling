import {z} from "zod";

export const RegisterDto = z.object({
    name : z.string().min(1, "Name is required"),
    email : z.string().email("Please provide valid email").min(1, "Email is required"),
    password : z.string().min(6, "Password must be at least 6 characters long")
});

export const LoginDto = z.object({
    email : z.string().email("Please provide valid email").min(1, "Email is required"),
    password : z.string().min(6, "Password must be at least 6 characters long")
});