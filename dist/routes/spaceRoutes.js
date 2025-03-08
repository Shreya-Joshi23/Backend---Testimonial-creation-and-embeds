"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authmiddleware_1 = require("../middlewares/authmiddleware");
const Space_1 = require("../controllers/Space/Space");
const Testimonial_1 = require("../controllers/Testimonial/Testimonial");
const spaceRouter = express_1.default.Router();
spaceRouter.post("/addspace", authmiddleware_1.authmiddleware, Space_1.addspace);
spaceRouter.get("/", authmiddleware_1.authmiddleware, Space_1.getuserspaces);
spaceRouter.delete("/:id", authmiddleware_1.authmiddleware, Space_1.deletespace);
spaceRouter.patch("/update/:id", authmiddleware_1.authmiddleware, Space_1.updatespace);
spaceRouter.post("/:slug", authmiddleware_1.authmiddleware, Testimonial_1.submitTestimonial);
exports.default = spaceRouter;
