// signup,login

import { Request, Response } from "express";
import { SigninSchema, SignupSchema } from "../../validations/Signschema";
import db from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function signupcontroller(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: parsedData.error.issues[0].message,
    });
    return;
  }
  //BEFORE CREATING THE USER WITH REQUIRED NAME EMAIIL AND PASSWORD ASK FOR EMAIL VERIFICATION USING OTP
  // use password encryption
  let saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedpassword = await bcrypt.hash(password, salt);
  try {
    const user = await db.user?.create({
      // @ts-ignore
      data: {
        name,
        email,
        password: hashedpassword,
      },
    });
    res.status(200).json({
      message:"Registered successfully",
      user
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    res.status(400).json({ message: "Internal server error", error:error.message });
  }
}

export async function signincontroller(req: Request, res: Response) {
  const { email, password } = req.body;
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
     res.status(400).json({
      message: parsedData.error.issues[0].message,
    });
    return;
  }

  try {
    //verify email
    const user = await prisma?.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });
    if(!user){
        res.status(400).json({
            message:"Create an account first"
        })
        return;
    }
    console.log(user);
    if(!user?.email_verified){
        res.status(400).json({
            message:"Verify your email first"
        })
        return;
    }
    const ispasswordCorrect=await bcrypt.compare(parsedData.data.password,user?.password as string)
    if(!ispasswordCorrect){
        res.status(400).json({
            message:"Incorrect credentials"
        })
        return;
    }
    const jwtsecret=process.env.JWT_SECRET as string
    const token=jwt.sign({id:user?.id},jwtsecret,{expiresIn:"7d"});
    res.status(200).json({
        message:"signed in successfully",
        token
    })
    return;
  } catch (error:any) {
        res.status(400).json({
            message:"Internal server error",
            error:error?.message
        })
  }
}
