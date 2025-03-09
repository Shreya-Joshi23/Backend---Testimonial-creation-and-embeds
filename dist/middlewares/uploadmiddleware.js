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
exports.uploadmiddleware = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
cloudinary_1.v2.config({
    cloud_name: "ddmr3rdhz",
    api_key: "294441615176745",
    api_secret: "nJ42IpJRtpf2VnWj3DQHhPTxJCI"
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        // @ts-ignore
        folder: "testimonials",
        resource_type: "video",
        format: () => __awaiter(void 0, void 0, void 0, function* () { return "mp4"; }),
        public_id: (req, file) => `${Date.now()}-${file.originalname}`
    }
});
exports.uploadmiddleware = (0, multer_1.default)({
    storage,
    // limits:{fileSize:50*1024*1024}
}).single("file");
