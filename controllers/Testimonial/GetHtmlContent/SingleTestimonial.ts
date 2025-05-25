export async function embedsingletestimonialHTML(testimonial: any) {
    return `
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
    `
}