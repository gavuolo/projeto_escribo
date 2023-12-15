import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from 'jsonwebtoken';
import { unauthorizedError } from "@/errors/unauthorized-error";
import prisma from "@/config/database";

export async function authenticateToken(req, res, next){
    const authHeader = req.header('Authorization');
    if (!authHeader){ 
        return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError())
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError())
    }
    try{
        const { userId, userType } = jwt.verify(token, process.env.JWT_SECRET)
        const session = await prisma.session.findFirst({
            where:{
                token,
            },
        });
        if (!session){
            return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError())
        }
        
        req.userId = userId;
        req.userType = userType
        return next()
    }catch(error){
        return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError())
    }
}