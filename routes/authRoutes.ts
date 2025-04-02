import express, { Router } from "express"
import {signupcontroller,signincontroller, logoutuser, checkToken} from "../controllers/Auth/Auth"
import { generateotp, verifyuser } from "../controllers/Auth/AccountVerification";
import updatepassword from "../controllers/Auth/ForgetPassword";

const authRouter=Router();

authRouter.post("/signup",signupcontroller)
authRouter.post("/signin",signincontroller)
authRouter.post("/generateotp",generateotp)
authRouter.post("/verifyotp",verifyuser)
authRouter.post("/updatepassword",updatepassword)
authRouter.post("/logout",logoutuser)
authRouter.get("/isAuth",checkToken)
export default authRouter