import httpStatus from "http-status";
import * as jwt from 'jsonwebtoken';
import prisma from "../config/database.js";

export default async function authenticateToken(req, res, next){
    const authHeader = req.header('Authorization');
    
    if (!authHeader){ 
        return res.status(httpStatus.UNAUTHORIZED).send("Não autorizado, sem token")
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(httpStatus.UNAUTHORIZED).send("Não autorizado, sem token")
    }
    try{
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
       
        const session = await prisma.session.findFirst({
            where:{
                token,
            },
        });
        if (!session){
            return res.status(httpStatus.UNAUTHORIZED).send("Não autorizado, nao tem sessao")
        }
        
        req.userId = userId;
        return next()
    }catch(error){
        return res.status(httpStatus.UNAUTHORIZED).send("Não autorizado")
    }
}