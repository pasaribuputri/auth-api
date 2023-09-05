import jwt from "jsonwebtoken";
import "dotenv/config"

function authMiddleware (req,res,next) {
    const token = req.cookies.jwt;
    if(token){
        try{
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decodedToken;
            if(req.method === "GET" || req.method === "POST"){
                next();
            }else{
                res.status(401).json({status: "Unauthorized", message: "Anda tidak diizinkan melakukan tindakan ini"})
            }
        }catch(err){
            res.status(401).json({status: "Unauthorized", message: "Token tidak valid"})
        }
    }else{
        res.status(401).json({status: "Unauthorized" , message: "Anda belum login"})
    }
}

export default authMiddleware;