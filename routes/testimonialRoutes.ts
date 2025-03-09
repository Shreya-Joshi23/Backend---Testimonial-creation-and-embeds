import express from "express"
import { getTestimonials, submitTestimonial } from "../controllers/Testimonial/Testimonial"
import { uploadmiddleware } from "../middlewares/uploadmiddleware"

const reviewRouter=express.Router()

//store text and video review in testimoinal model
//use multer as middleware for storing video review to cloudinary
reviewRouter.post('/:slug/submit',uploadmiddleware,submitTestimonial)

//get video review and text reviews
reviewRouter.get('/:slug',getTestimonials)

export default reviewRouter