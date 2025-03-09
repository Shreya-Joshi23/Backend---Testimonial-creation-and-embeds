import { NextFunction, Request, Response } from "express";
import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
    cloud_name:"ddmr3rdhz",
    api_key:"294441615176745",
    api_secret:"nJ42IpJRtpf2VnWj3DQHhPTxJCI"
})

const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        // @ts-ignore
        folder:"testimonials",
        resource_type:"video",
        format:async ()=>"mp4",
        public_id:(req,file)=>`${Date.now()}-${file.originalname}`
    }
})

export const uploadmiddleware=multer({
    storage,
    // limits:{fileSize:50*1024*1024}
}).single("file");
