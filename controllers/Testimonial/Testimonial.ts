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
  try {
    const photofile = (req.files as any)?.["photo"]?.[0];
    console.log("photo", photofile);

    const textreview = (req.files as any)?.["textreview"]?.[0];
    console.log("File", textreview);

    const videoreview = (req.files as any)?.["videoreview"]?.[0];
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

    // send mail for testimonial both got the testimonial and made a testimonial
    // const mailResponse=await Sendmail(parsedData.data)
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

export async function deleteTestimonial(req:NewRequest,res:Response){
  const {id}= req.params;
  try{
    await prisma?.testimonials.delete({
      where:{
        id: id,
      }
    })
    res.status(200).json({
      message: "Testimonial deleted successfully",
    });
  }catch(error:any){
    console.log("Error in deleting testimonial", error.message);
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
      message: `${
        testimonial.isfavourite ? "Removed from" : "Added to"
      } favourites`,
      isfavourite: updatedtestimonial?.isfavourite,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      message: "Internal server error",
    });
  }
}

export async function getgraphdata(req: NewRequest, res: Response) {
  try {
    console.log("Get graphic data");
    const userId=req.userId
    const testimonials = await prisma?.testimonials.findMany({
      where:{
        space:{
          userId:userId
        }
      },
      select: {
        reviewType: true,
        space: {
          select: {
            title: true,
          },
        },
      },
    });

    const typeCount = testimonials?.reduce((acc: any, curr) => {
      const key = curr.reviewType;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const reviewTypeData = Object.entries(typeCount).map(([type, count]) => ({
      type,
      count,
    }));

    const spacemap = new Map<string, number>();
    testimonials?.forEach((t) => {
      const title = t.space.title;
      spacemap.set(title, (spacemap.get(title) || 0) + 1);
    });

    const spaceData = Array.from(spacemap.entries()).map(([space, count]) => ({
      space,
      testimonialcount: count,
    }));

    res.json({
      typeCount: reviewTypeData,
      spaceData,
    });
  } catch (error: any) {
    console.log("Error in fetching graph data", error.message);
  }
}

export async function getfavourites(req: NewRequest, res: Response) {
  const slug = req.params.slug;
  const layout = req.query.layout || "default";

  try {
    const favourites = await prisma?.testimonials.findMany({
      where: {
        isfavourite: true,
        space: {
          slug: slug,
        },
      },
    });
    if (!favourites) {
      res.status(400).json({
        message: "No testimonial added to favourites",
      });
      return;
    }
    const testimonial = favourites[0];
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Embedded Testimonial</title>
      <style>
        body {
          margin: 0;
          padding: 1rem;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
        }
        .testimonial-container {
          max-width: 600px;
          margin: auto;
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .testimonial-message {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 1rem;
        }
        .testimonial-author {
          font-size: 0.95rem;
          font-weight: bold;
          color: #555;
          text-align: right;
        }

        ${
          layout === "compact"
            ? `
          .testimonial-container {
            padding: 1rem;
            border-left: 4px solid #3498db;
          }
        `
            : ""
        }
      </style>
    </head>
    <body>
      <div class="testimonial-container">
        <div class="testimonial-message">"${escape(
          testimonial.reviewType
        )}"</div>
        <div class="testimonial-author">- ${escape(testimonial.name)}</div>
      </div>
    </body>
    </html>
    `);
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      message: "Internal server error",
    });
  }
}

export async function gettestimonial(req: NewRequest, res: Response) {
  try {
    const id = req.params.id;
    const testimonial = await db.testimonials.findUnique({
      where: {
        id,
      },
    });
    if (!testimonial) {
      res.status(400).json({
        message: "Testimonial not found",
      });
      return;
    }
    res.status(200).json({
      message: "Testimonial fetched successfully",
      testimonial,
    });
  } catch (error: any) {
    console.log("Error in fetching testimonial", error.message);
  }
}
