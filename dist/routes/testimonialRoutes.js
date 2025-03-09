"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Testimonial_1 = require("../controllers/Testimonial/Testimonial");
const uploadmiddleware_1 = require("../middlewares/uploadmiddleware");
const reviewRouter = express_1.default.Router();
//store text and video review in testimoinal model
//use multer as middleware for storing video review to cloudinary
reviewRouter.post('/:slug/submit', uploadmiddleware_1.uploadmiddleware, Testimonial_1.submitTestimonial);
//get video review and text reviews
reviewRouter.get('/:slug', Testimonial_1.getTestimonials);
exports.default = reviewRouter;
