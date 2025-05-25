import bcrypt from "bcrypt";

// Function to hash a password using bcrypt
// It uses a salt rounds value of 10 for hashing
export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

// Function to compare a password with a hashed password
export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};