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
exports.mailSender = mailSender;
const nodemailer_1 = __importDefault(require("nodemailer"));
function mailSender(email, title, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let transporter = nodemailer_1.default.createTransport({
                service: process.env.HOST_SERVICE,
                auth: {
                    user: process.env.HOST_MAIL,
                    pass: process.env.HOST_PASS
                }
            });
            // console.log(transporter);
            console.log(process.env.HOST_PASS);
            let info = yield transporter.sendMail({
                from: process.env.HOST_MAIL,
                to: email,
                subject: title,
                html: body
            });
            console.log("Email info", info);
            return { success: true, info };
        }
        catch (error) {
            console.log(error.message);
            return { success: false };
        }
    });
}
