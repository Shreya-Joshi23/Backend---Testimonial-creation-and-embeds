import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "ddmr3rdhz",
  api_key: "294441615176745",
  api_secret: "nJ42IpJRtpf2VnWj3DQHhPTxJCI",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    return {
      // @ts-ignore
      folder: "testimonials",
      resource_type: isVideo ? "video" : "image",
      format: isVideo ? "mp4" : undefined,
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

export const uploadmiddleware = multer({
  storage,
}).fields([
  {name:'textreview',maxCount:1},
  {name:'photo',maxCount:1},
  {name:'videoreview',maxCount:1},
  {name:'spacelogo',maxCount:1}
])
