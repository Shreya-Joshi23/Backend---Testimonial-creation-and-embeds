import { NextFunction, Request, Response } from "express";
import { ReviewSchema } from "../../validations/ReviewSchema";
import db from "../../db";
import { NewRequest } from "../../interfaces/requestinterface";

export async function submitTestimonial(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // http://localhost:3000/attendance-managemnet-system
  const slug = req.params.slug;
  const {reviewType}=req.body
  try {
    const photofile = (req.files as any)?.["photo"]?.[0];
    console.log("photo", photofile);

    const textreview = (req.files as any)?.["textreview"]?.[0];
    console.log("File", textreview);

    const videoreview=(req.files as any)?.["videoreview"]?.[0];
    const parsedData = ReviewSchema.safeParse({
      ...req.body,
      reviewFile: textreview?.path,
      videoUrl: videoreview?.path,
      photo: photofile?.path,
    });
    console.log("Parseddata", parsedData);
    if (!parsedData.success) {
      res.status(400).json({
        message: parsedData.error.issues[0],
      });
      return;
    }
    // find the space id from testimonial slug given
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
        rating: Number(parsedData.data.rating),
        email: parsedData.data.email,
        reviewType: parsedData.data.reviewType,
        // if case of text review
        reviewText: parsedData.data.reviewText,
        //video file will be uploaded to cloudinary and added  as file in request object
        photo: photofile?.path,
        reviewFile: textreview?.path || null,
        videoUrl: videoreview?.path || null,
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

export async function getTestimonials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  try {
    // find spaceid and then find in testimonials table
    const space = await db.spaces.findUnique({
      where: { slug },
    });
    if (!space) {
      res.status(400).json({
        message: "Space not found",
      });
      return;
    }
    const reviews = await db.testimonials.findMany({
      where: {
        spaceId: space?.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      message: "Internal server error",
    });
  }
}

export async function addtofavourite(req: NewRequest, res: Response) {
  const testimonialId = req.params.id;
  const userId = req.userId;
  try {
    //check if this testimoanial space created by req.userId
    const testimonial = await prisma?.testimonials.findUnique({
      where: {
        id: testimonialId,
      },
      //includes the space this testimonials belongs to
      include: {
        space: true,
      },
    });
    if (!testimonial) {
      res.status(400).json({
        message: "Testimonial not found",
      });
      return;
    }
    if (testimonial.space.userId !== userId) {
      res.status(400).json({
        message: "You are not allowed to mark this testimonial as favourite.",
      });
    }
    const updatedtestimonial = await prisma?.testimonials.update({
      where: {
        id: testimonialId,
      },
      data: {
        isfavourite: !testimonial.isfavourite,
      },
    });
    res.status(200).json({
      message: "Added to favourites",
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      message: "Internal server error",
    });
  }
}

// get favourites for particular space
export async function getfavourites(req: NewRequest, res: Response) {
  const spaceId = req.params.id;

  try {
    const favourites = await prisma?.testimonials.findMany({
      where: {
        isfavourite: true,
        spaceId: spaceId,
      },
    });
    if (!favourites) {
      res.status(400).json({
        message: "No testimonial added to favourites",
      });
      return;
    }
    res.status(200).json({
      message: "Favourites fetched successfully",
      favourites,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      message: "Internal server error",
    });
  }
}
