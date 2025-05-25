import { NewRequest } from "../../interfaces/requestinterface";
import db from "../../db";
import { Response } from "express";
import { embedsingletestimonialHTML } from "./GetHtmlContent/SingleTestimonial";
import { embedSingleTypeTestimonial } from "./GetHtmlContent/SingleTypeTestimonial";
import { generateCarouselSliderHTML, generateMasonryFixedHTML } from "./GetHtmlContent/WallOfLove";

export async function embedsingletestimonial(req: NewRequest, res: Response) {
  const id = req.params.id;
  try {
    const testimonial = await db.testimonials.findUnique({
      where: {
        id,
      },
    });

    if (!testimonial) {
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
          </style>
          </head>
          <body>
            
            <div class="testimonial-container">
              <div class="testimonial-message">No testimonial found</div>
              <div class="testimonial-author">- Anonymous</div>
            </div>
          </body>
          </html>
              `);
      return;
    }
    const htmlContent = await embedsingletestimonialHTML(testimonial);
    res.send(htmlContent);
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function embedsingletypetestimonial(
  req: NewRequest,
  res: Response
) {
  const slug = req.params.slug;
  const type = req.params.type;

  if (!slug || !type) {
    return res.status(400).send("<h3>Missing slug or type parameter</h3>");
  }

  try {
    const testimonial = await db.testimonials.findFirst({
      where: {
        space: {
          is: { slug },
        },
        // @ts-ignore
        reviewType: type.toUpperCase() || "TEXT",
      },
    });

    if (!testimonial) {
      return res.status(404).send("<h3>Testimonial not found</h3>");
    }

    const htmlContent = await embedSingleTypeTestimonial(testimonial);
    res.setHeader('Content-Type', 'text/html');

    res.status(200).send(htmlContent);
  } catch (error: any) {
    console.error("Error in fetching testimonial:", error.message);
    res
      .status(500)
      .send(`<h3>Internal Server Error</h3><p>${error.message}</p>`);
  }
}

export async function embedwalloflove(req:NewRequest,res:Response){
  const slug = req.params.slug;
  const layout = req.params.layout as string;

  console.log(layout)
  console.log("Wall of love")

  try{
    const testimonials=await db.testimonials.findMany({
      where:{
        isfavourite:true,
        space:{
          slug:slug
        }
      }
    })
    if(!testimonials || testimonials.length==0){
      return res.status(404).send("<h3>No testimonials added to favourites.</h3>");
    }

    let html="";
    switch (layout) {
      case "carouselSlider":
        html =await generateCarouselSliderHTML(testimonials);
        break;
      case "masonry-fixed":
        html =await generateMasonryFixedHTML(testimonials);
        break;
      default:
        html =await generateCarouselSliderHTML(testimonials);
    }

    
    res.status(200).send(html);
  }catch(error:any){
    res.status(400).json({
      message: error.message,
    });
  }
}