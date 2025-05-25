import express from "express";
import authRouter from "./routes/authRoutes";
import cors from "cors";
import spaceRouter from "./routes/spaceRoutes";
import reviewRouter from "./routes/testimonialRoutes";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173","http://127.0.0.1:5500"];

app.use(express.static('public')); 
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Content-Security-Policy", "frame-ancestors *");
  next();
});

console.log("Serving from", path.join(__dirname, "public", "static"));
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/",(req,res)=>{
  res.send(`
    <h1>Welcome to Gimme Feedbacks API</h1>
    <p>View the <a href="https://your-docs-link.com" target="_blank">API Documentation</a>.</p>
  `);
})

app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/space", spaceRouter);
app.use("/api/v1/review", reviewRouter);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
