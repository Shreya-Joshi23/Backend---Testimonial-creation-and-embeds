import express from "express"
import { addtofavourite, embedsingletestimonial, getTestimonials, getfavourites, getgraphdata, gettestimonial, submitTestimonial } from "../controllers/Testimonial/Testimonial"
import { uploadmiddleware } from "../middlewares/uploadmiddleware"
import { authmiddleware } from "../middlewares/authmiddleware"

const reviewRouter=express.Router()

//store text and video review in testimoinal model
//use multer as middleware for storing video review to cloudinary
reviewRouter.post('/:slug/submit',uploadmiddleware,submitTestimonial)

//get video review and text reviews
reviewRouter.get('/:slug',authmiddleware,getTestimonials)

//mark the testimonial as favourite
reviewRouter.patch('/:id/addtofavourite',authmiddleware,addtofavourite)

//get favorite testimonials i.e get testimonials added to wall of love
reviewRouter.get('/embed/:slug',getfavourites)

reviewRouter.get('/graph/data',getgraphdata)

reviewRouter.get('/testimonial/:id',gettestimonial)

reviewRouter.get('/embedsingle/:id',embedsingletestimonial)
export default reviewRouter