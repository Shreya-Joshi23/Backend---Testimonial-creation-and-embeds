import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { NewRequest } from "../interfaces/requestinterface";

export async function authmiddleware(req:NewRequest,res:Response,next:NextFunction){
    const token=req.cookies?.access_token;
    console.log(token)
    console.log("Token",req.headers?.cookie?.substring(6))
    console.log("Cookie token",req.cookies.token)
    if(!token ){
        res.status(400).json({
            message:"Invalid authentication (Token not found)"
        })
        return;
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