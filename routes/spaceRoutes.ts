import express from "express"
import { authmiddleware } from "../middlewares/authmiddleware";
import { addspace, deletespace, getuserspaces, updatespace } from "../controllers/Space/Space";
import {submitTestimonial} from "../controllers/Testimonial/Testimonial";
import { uploadmiddleware } from "../middlewares/uploadmiddleware";

const spaceRouter=express.Router();

spaceRouter.post("/addspace",authmiddleware,uploadmiddleware,addspace);
spaceRouter.get("/",authmiddleware,getuserspaces)
spaceRouter.delete("/:id",authmiddleware,deletespace);
spaceRouter.patch("/update/:id",authmiddleware,updatespace);
spaceRouter.post("/:slug",authmiddleware,submitTestimonial);
export default spaceRouter