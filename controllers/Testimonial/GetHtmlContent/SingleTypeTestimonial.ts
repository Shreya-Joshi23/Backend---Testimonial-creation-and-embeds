export async function embedSingleTypeTestimonial(testimonial:any){
    return `
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
      <div class="testimonial">
        <h2>${testimonial.reviewText || "Testimonial"}</h2>
        ${
          testimonial.videoUrl
            ? `<video src="${testimonial.videoUrl}" class="testimonial-video" controls></video>`
            : ""
        }
        <p>- ${testimonial.name || "Anonymous"}</p>
      </div>
    `
}