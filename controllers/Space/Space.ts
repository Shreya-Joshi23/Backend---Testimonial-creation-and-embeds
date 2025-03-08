import { NextFunction, Response } from "express";
import { NewRequest } from "../../interfaces/requestinterface";
import db from "../../db"
import slugify from "slugify";

export async function addspace(req:NewRequest,res:Response,next:NextFunction){
    const {title,description}:{
        title:string,
        description:string
    }=req.body;
    try{
        const userId=req.userId
        console.log(userId)
        if(!userId){
            res.status(400).json({
                message:"UserId not defined.Space creation request failed"
            })
            return;
        }
        const space=await db?.spaces.create({
            data:{
                userId,
                title,
                // @ts-ignore
                description,
                slug:slugify(title,{lower:true,strict:true})
            },
            omit:{
                userId:true
            }
        })
        res.status(200).json({
            message:"Space created successfully",
            space
        })
    }catch(error:any){
        console.log(error.message)
        res.status(400).json({
            message:"Internal server error"
        })
    }
}

export async function getuserspaces(req:NewRequest,res:Response){
    const userId=req.userId
    try{
        const spaces=await db?.spaces.findMany({
            where:{
                userId:userId
            },
            orderBy:{
                "createdAt":"asc"
            }
        });
        res.status(200).json({
            message:"Spaces fetched sccessfully",
            spaces
        })
    }catch(error:any){
        console.log(error.message)
        res.status(400).json({
            message:"Internal server error"
        })
    }
}

export async function updatespace(req:NewRequest,res:Response){
    const spaceId=req.params.id
    const {title,description}=req.body
    try{
        const updatedspace=await db?.spaces.update({
            where:{
                id:spaceId
            },
            data:{
                title,
                description,
                slug:slugify(title,{lower:true,strict:true})
            },
            omit:{
                id:true
            }
        })
        res.status(200).json({
            message:"Space updated successfully",
            updatedspace
        })
    }catch(error:any){
        console.log(error.message)
        res.status(400).json({
            message:"Internal server error"
        })
    }
}

export async function deletespace(req:NewRequest,res:Response){
    const spaceId=req.params.id;
    try{
        await db?.spaces.delete({
            where:{
                id:spaceId
            }
        })
        res.status(200).json({
            message:"Space deleted successfully"
        })
    }catch(error:any){
        console.log(error.message)
        res.status(400).json({
            message:"Internal server error"
        })
    }
}

