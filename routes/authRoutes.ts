import express from "express"
import {signupcontroller,signincontroller} from "../controllers/Auth/Auth"
import { generateotp, verifyuser } from "../controllers/Auth/AccountVerification";
import updatepassword from "../controllers/Auth/ForgetPassword";

const authRouter=express.Router();

authRouter.post("/signup",signupcontroller)
authRouter.post("/signin",signincontroller)
authRouter.post("/generateotp",generateotp)
authRouter.post("/verifyotp",verifyuser)
authRouter.post("/updatepassword",updatepassword)

export default authRouter