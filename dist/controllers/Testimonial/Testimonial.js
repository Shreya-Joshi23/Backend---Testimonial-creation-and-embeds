"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitTestimonial = submitTestimonial;
exports.getTestimonials = getTestimonials;
const ReviewSchema_1 = require("../../validations/ReviewSchema");
const db_1 = __importDefault(require("../../db"));
function submitTestimonial(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // http://localhost:3000/attendance-managemnet-system
        const slug = req.params.slug;
        const { photourl } = req.body;
        try {
            const parsedData = ReviewSchema_1.ReviewSchema.safeParse(req.body);
            console.log(parsedData);
            if (!parsedData.success) {
                res.status(400).json({
                    message: parsedData.error.issues[0].message,
                });
                return;
            }
            //find the space id from testimonial slug given
            const space = yield db_1.default.spaces.findUnique({
                where: { slug },
            });
            if (!space) {
                res.status(400).json({
                    message: "Space not found",
                });
            }
            const testimonial = yield db_1.default.testimonials.create({
                // @ts-ignore
                data: {
                    name: parsedData.data.name,
                    spaceId: space === null || space === void 0 ? void 0 : space.id,
                    rating: parsedData.data.rating,
                    email: parsedData.data.email,
                    photo: photourl,
                    reviewType: parsedData.data.reviewType,
                    reviewText: parsedData.data.reviewText,
                    videoUrl: parsedData.data.videourl,
                },
            });
            res.status(200).json({
                message: "Review submitted successfully",
                testimonial,
            });
        }
        catch (error) {
            console.log(error.message);
            res.status(400).json({
                message: "Internal server error",
            });
        }
    });
}
function getTestimonials(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const slug = req.params.slug;
        try {
            // find spaceid and then find in testimonials table
            const space = yield db_1.default.spaces.findUnique({
                where: { slug }
            });
            if (!space) {
                res.status(400).json({
                    message: "Space not found"
                });
                return;
            }
            const reviews = yield db_1.default.testimonials.findMany({
                where: {
                    spaceId: space === null || space === void 0 ? void 0 : space.id
                },
                orderBy: {
                    createdAt: "asc"
                }
            });
            res.status(200).json({
                message: "Reviews fetched successfully",
                reviews
            });
        }
        catch (error) {
            console.log(error.message);
            res.status(400).json({
                message: "Internal server error"
            });
        }
    });
}
