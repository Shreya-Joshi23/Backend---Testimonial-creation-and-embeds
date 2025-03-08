import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { NewRequest } from "../interfaces/requestinterface";

export async function authmiddleware(req:NewRequest,res:Response,next:NextFunction){
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(400).json({
            message:"Invalid authentication (Token not found)"
        })
        return;
    }
    const token=authHeader?.split(' ')[1];
    if(!token){
        res.status(400).json({
            message:"Token undefined"
        })
    }
    try{
        console.log("Token: ",token)
        const payload=jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
        console.log("Payload: ",payload)
        req.userId=payload.id;
        next()
    }catch(error:any){
        console.log(error.message)
        res.status(400).json({
            message:"Internal server error:authmiddleware"
        })
    }
}