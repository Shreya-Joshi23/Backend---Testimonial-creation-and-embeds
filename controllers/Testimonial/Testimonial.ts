import { NextFunction, Request, Response } from "express";
import { ReviewSchema } from "../../validations/ReviewSchema";
import db from "../../db";

export async function submitTestimonial(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // http://localhost:3000/attendance-managemnet-system
  const slug = req.params.slug;
  const { photourl } = req.body;
  try {
    const parsedData = ReviewSchema.safeParse(req.body);
    console.log(parsedData);
    if (!parsedData.success) {
      res.status(400).json({
        message: parsedData.error.issues[0].message,
      });
      return;
    }
    //find the space id from testimonial slug given
    const space = await db.spaces.findUnique({
      where: { slug },
    });

    if (!space) {
      res.status(400).json({
        message: "Space not found",
      });
    }

    const testimonial = await db.testimonials.create({
      // @ts-ignore
      data: {
        name: parsedData.data.name,
        spaceId: space?.id,
        rating: parsedData.data.rating,
        email: parsedData.data.email,
        photo: photourl,
        reviewType: parsedData.data.reviewType,
        reviewText: parsedData.data.reviewText,
        videoUrl: parsedData.data.videourl,
      },
    });

    res.status(200).json({
      message: "Review submitted successfully",
      testimonial,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      message: "Internal server error",
    });
  }
}

export async function getTestimonials(req:Request,res:Response,next:NextFunction){
    const slug=req.params.slug;
    try{
        // find spaceid and then find in testimonials table
        const space=await db.spaces.findUnique({
            where:{slug}
        })
        if(!space){
            res.status(400).json({
                message:"Space not found"
            })
            return;
        }
        const reviews=await db.testimonials.findMany({
            where:{
                spaceId:space?.id
            },
            orderBy:{
                createdAt:"asc"
            }
        })
        res.status(200).json({
            message:"Reviews fetched successfully",
            reviews
        })
    }catch(error:any){
        console.log(error.message);
        res.status(400).json({
            message:"Internal server error"
        })
    }
}