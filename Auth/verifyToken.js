import  Jwt  from "jsonwebtoken";

export const verifyToken = (token) => {
    try {
        return Jwt.verify(token, process.env.SECRET);    
    } catch (error) {
        return false
    }
    
}