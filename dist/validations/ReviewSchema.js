"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
const zod_1 = require("zod");
exports.ReviewSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Enter correct email format" }),
    name: zod_1.z.string().min(1, { message: "Name field cannot be empty" }).max(30, { message: "Don't mess up with your name" }),
    rating: zod_1.z.number(),
    //if reviewtype is text then check if reviewText isn't empty
    //if reviewType is video then check if videourl isn't empty
    //use conditional validation in zod using refine
    reviewType: zod_1.z.enum(["TEXT", "VIDEO"], { message: "Invalid reviewType" }),
    reviewText: zod_1.z.string().optional(),
    videourl: zod_1.z.string().url({ message: "Invalid video url" }).optional()
}).refine((data) => {
    if (data.reviewType === "TEXT") {
        return !!data.reviewText;
    }
    if (data.reviewType === "VIDEO") {
        return !!data.videourl;
    }
}, {
    message: "Text review or video url cannot be empty based on review type",
    path: ["reviewType"]
});
