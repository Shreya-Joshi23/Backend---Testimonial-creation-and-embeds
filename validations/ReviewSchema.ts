import {z} from "zod"

export const ReviewSchema=z.object({
    email:z.string().email({message:"Enter correct email format"}),
    name:z.string().min(1,{message:"Name field cannot be empty"}).max(30,{message:"Don't mess up with your name"}),
    rating:z.string(),
    reviewType:z.enum(["TEXT","VIDEO"],{message:"Invalid reviewType"}),
    reviewText:z.string().optional(),
    photo:z.string().url({message:"Invalid photo url"}).optional(),
    reviewFile:z.string().url({message:"Invalid text review image"}).optional(),
    videoUrl:z.string().url({message:"Invalid video url"}).optional()
})
.refine((data)=>{
    if(data.reviewType==="TEXT"){
        return !!data.reviewText
    }
    if(data.reviewType==="VIDEO"){
        return !!data.videoUrl
    }
},{
    message:"Text review or video url cannot be empty based on review type",
    path:["reviewType"]
})