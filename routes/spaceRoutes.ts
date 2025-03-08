import express from "express"
import { authmiddleware } from "../middlewares/authmiddleware";
import { addspace, deletespace, getuserspaces, updatespace } from "../controllers/Space/Space";
import {submitTestimonial} from "../controllers/Testimonial/Testimonial";

const spaceRouter=express.Router();

spaceRouter.post("/addspace",authmiddleware,addspace);
spaceRouter.get("/",authmiddleware,getuserspaces)
spaceRouter.delete("/:id",authmiddleware,deletespace);
spaceRouter.patch("/update/:id",authmiddleware,updatespace);
spaceRouter.post("/:slug",authmiddleware,submitTestimonial);
export default spaceRouter