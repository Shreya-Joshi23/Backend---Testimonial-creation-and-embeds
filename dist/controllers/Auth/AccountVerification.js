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
exports.generateotp = generateotp;
exports.verifyuser = verifyuser;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Sendotp_1 = require("../../utils/Sendotp");
function generateotp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //generate otp ansend to frontend frontend will send via email
        const { email } = req.body;
        try {
            const user = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.findUnique({
                where: {
                    email: email,
                },
            }));
            if (!user) {
                res.status(400).json({
                    message: "User not found.Sign up first",
                });
                return;
            }
            if (user.email_verified) {
                res.status(400).json({
                    message: "User already verified.Signin yourself",
                });
                return;
            }
            const otp = crypto_1.default.randomInt(100000, 999999).toString();
            const hashedotp = yield bcrypt_1.default.hash(otp, 10);
            const mailResponse = yield (0, Sendotp_1.mailSender)(email, "Verification Email", `<h1>Please confirm your OTP</h1>
             <p>Here is your OTP code: ${otp}</p>`);
            if (!mailResponse.success) {
                res.status(400).json({
                    message: "Otp not sent",
                });
                return;
            }
            console.log("otp sent", otp);
            yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.update({
                where: {
                    email,
                },
                data: {
                    otp: hashedotp,
                    otp_expires_at: new Date(Date.now() + 5 * 60 * 1000),
                },
            }));
            res.status(200).json({
                message: "Otp sent successfully",
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
function verifyuser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //check if otp is correct and if correct update email_verified to true
        const { email, userotp } = req.body;
        try {
            const user = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.findUnique({ where: { email } }));
            if (!user) {
                res.status(400).json({
                    message: "User not found",
                });
                return;
            }
            const currtime = new Date();
            if (user.otp === null ||
                ((user === null || user === void 0 ? void 0 : user.otp_expires_at) && currtime > user.otp_expires_at)) {
                res.status(400).json({
                    message: "OTP expired.Regenerate OTP",
                });
                return;
            }
            console.log("User otp", user.otp);
            const isOTPvalid = yield bcrypt_1.default.compare(userotp, user.otp);
            console.log(isOTPvalid);
            if (!isOTPvalid) {
                res.status(400).json({
                    message: "Incorrect OTP",
                });
                return;
            }
            yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    email_verified: true,
                    otp: null,
                    otp_expires_at: null,
                },
            }));
            res.status(200).json({
                message: "OTP verification successfull",
            });
            return;
        }
        catch (error) {
            console.log(error.message);
            res.status(400).json({
                message: "Internal server error",
            });
        }
    });
}
