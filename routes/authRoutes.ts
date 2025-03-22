import express from "express"
import {signupcontroller,signincontroller, getMe} from "../controllers/Auth/Auth"
import { generateotp, verifyuser } from "../controllers/Auth/AccountVerification";
import updatepassword from "../controllers/Auth/ForgetPassword";
import { authmiddleware } from "../middlewares/authmiddleware";

const authRouter=express.Router();

authRouter.post("/signup",signupcontroller)
authRouter.post("/signin",signincontroller)
authRouter.post("/generateotp",generateotp)
authRouter.post("/verifyotp",verifyuser)
authRouter.post("/updatepassword",updatepassword)
authRouter.get("/me",authmiddleware,getMe)
export default authRouter