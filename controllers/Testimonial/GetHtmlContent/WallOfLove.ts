export async function generateCarouselSliderHTML(testimonials:any[]){
    return `
      <style>
        body { margin: 0; font-family: Arial; background: #f4f4f4; padding: 2rem; }
        .carousel-container { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 1rem; }
        .testimonial-card {
          scroll-snap-align: center;
          flex: 0 0 80%;
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .testimonial-message { margin-bottom: 1rem; font-size: 1.1rem; }
        .testimonial-author { text-align: right; font-weight: bold; color: #555; }
      </style>
      <div class="carousel-container">
        ${testimonials
          .map(
            (t) => `
            <div class="testimonial-card">
              ${
                t.reviewType === "VIDEO"
                  ? `<video src="${t.videoUrl}" controls width="100%" style="border-radius:8px;"></video>`
                  : `<div class="testimonial-message">${t.reviewText}</div>`
              }
              <div class="testimonial-author">- ${t.name || "Anonymous"}</div>
            </div>`
          )
          .join("")}
      </div>
    `
}

export async function generateMasonryFixedHTML(testimonials:any[]){
    return `
      <style>
        body { margin: 0; font-family: Arial; background: #f4f4f4; padding: 2rem; }
        .masonry-container {
          column-count: 3;
          column-gap: 1rem;
        }
        .testimonial-card {
          break-inside: avoid;
          background: white;
          margin-bottom: 1rem;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .testimonial-message { margin-bottom: 1rem; font-size: 1rem; }
        .testimonial-author { font-weight: bold; color: #555; text-align: right; }
        video { width: 100%; border-radius: 8px; }
      </style>
      <div class="masonry-container">
        ${testimonials
          .map(
            (t) => `
            <div class="testimonial-card">
              ${
                t.reviewType === "VIDEO"
                  ? `<video src="${t.videoUrl}" controls></video>`
                  : `<div class="testimonial-message">${t.reviewText}</div>`
              }
              <div class="testimonial-author">- ${t.name || "Anonymous"}</div>
            </div>`
          )
          .join("")}
      </div>
    `
}
