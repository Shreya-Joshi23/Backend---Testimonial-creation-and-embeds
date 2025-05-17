import { NewRequest } from "../../interfaces/requestinterface";
import db from "../../db";
import { Response } from "express";

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
          text-align: center;
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
          margin-top: 0.5rem;
        }
        video {
          width: 100%;
          max-height: 350px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
      </style>
    </head>
    <body>
      <div class="testimonial-container">
        ${
          testimonial?.reviewType === "VIDEO" && testimonial.videoUrl
            ? `<video src="${testimonial.videoUrl}" controls></video>`
            : `<div class="testimonial-message">${
                testimonial.reviewText || "No text review provided"
              }</div>`
        }
        <div class="testimonial-author">- ${testimonial.name}</div>
      </div>
    </body>
    </html>
  `);
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

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Testimonial Embed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 1rem;
            background-color: #f9f9f9;
          }
          .testimonial {
            border: 1px solid #ccc;
            padding: 1rem;
            border-radius: 8px;
            background: white;
            max-width: 600px;
            margin: auto;
          }
          .testimonial-video {
            width: 320px;
            height: 180px;
            display: block;
            margin: 1rem auto 0;
            border-radius: 8px;
            object-fit: cover;
          }
        </style>
      </head>
      <body>
        <div class="testimonial">
          <h2>${testimonial.reviewText || "Testimonial"}</h2>
          ${
            testimonial.videoUrl
              ? `<video src="${testimonial.videoUrl}" class="testimonial-video" controls></video>`
              : ""
          }
          <p>- ${testimonial.name || "Anonymous"}</p>
        </div>
      </body>
      </html>
    `;

    // res.setHeader("Content-Type", "text/html");
    res.status(200).send(htmlContent);
  } catch (error: any) {
    console.error("Error in fetching testimonial:", error.message);
    res
      .status(500)
      .send(`<h3>Internal Server Error</h3><p>${error.message}</p>`);
  }
}
