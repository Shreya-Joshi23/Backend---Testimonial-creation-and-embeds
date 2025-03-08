import express from "express"
import authRouter from "./routes/authRoutes";
import cors from "cors"
import spaceRouter from "./routes/spaceRoutes";

const app=express();
app.use(express.json())

const port=process.env.PORT || 5000

const allowedOrigins = ["https://somedomain.vercel.app", "http://localhost:5173"];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//middlewares
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/space",spaceRouter)

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})
