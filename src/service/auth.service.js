import jwt from "jsonwebtoken";
import "dotenv/config";
import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

// Generate JWT token
function generateJWT(id) {
    return jwt.sign(
        { id },
        process.env.SECRET_JWT,
        { expiresIn: 86400 } // 24 hours
    );
}

// Authenticates the user and returns a token
async function loginService(email, password) {
    const user = await userRepository.findByEmailUserRepository(email);
    
    // If user not found
    if (!user) throw new Error("Invalid user!");

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid user!");

    return generateJWT(user.id);
}

export default { generateJWT, loginService };
