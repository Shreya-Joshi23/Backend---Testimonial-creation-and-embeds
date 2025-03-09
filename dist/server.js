"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const spaceRoutes_1 = __importDefault(require("./routes/spaceRoutes"));
const testimonialRoutes_1 = __importDefault(require("./routes/testimonialRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 5000;
const allowedOrigins = ["https://somedomain.vercel.app", "http://localhost:5173"];
app.use((0, cors_1.default)({
    credentials: true,
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
//middlewares
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/space", spaceRoutes_1.default);
app.use("/api/v1/review", testimonialRoutes_1.default);
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
