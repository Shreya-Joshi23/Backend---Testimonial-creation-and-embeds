import {z} from "zod"

export const ReviewSchema=z.object({
    email:z.string().email({message:"Enter correct email format"}),
    name:z.string().min(1,{message:"Name field cannot be empty"}).max(30,{message:"Don't mess up with your name"}),
    rating:z.string(),
    //if reviewtype is text then check if reviewText isn't empty
    //if reviewType is video then check if videourl isn't empty
    //use conditional validation in zod using refine
    reviewType:z.enum(["TEXT","VIDEO"],{message:"Invalid reviewType"}),
    reviewText:z.string().optional(),
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