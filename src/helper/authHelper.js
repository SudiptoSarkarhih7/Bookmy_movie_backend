import jwt from "jsonwebtoken";
export const generateToken = (_id,role, ...rest) => {
    const token = jwt.sign({ _id,role , ...rest}, process.env.JWT_SECRET, {
        expiresIn: "10d",
    }); 
    return token;
};