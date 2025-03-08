"use strict";
// signup,login
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
exports.signupcontroller = signupcontroller;
exports.signincontroller = signincontroller;
const Signschema_1 = require("../../validations/Signschema");
const db_1 = __importDefault(require("../../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signupcontroller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { name, email, password } = req.body;
        const parsedData = Signschema_1.SignupSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: parsedData.error.issues[0].message,
            });
            return;
        }
        //BEFORE CREATING THE USER WITH REQUIRED NAME EMAIIL AND PASSWORD ASK FOR EMAIL VERIFICATION USING OTP
        // use password encryption
        let saltRounds = 10;
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hashedpassword = yield bcrypt_1.default.hash(password, salt);
        try {
            const user = yield ((_a = db_1.default.user) === null || _a === void 0 ? void 0 : _a.create({
                // @ts-ignore
                data: {
                    name,
                    email,
                    password: hashedpassword,
                },
            }));
            res.status(200).json({
                message: "Registered successfully",
                user
            });
        }
        catch (error) {
            if (error.code === "P2002") {
                res.status(400).json({ message: "Email already exists" });
                return;
            }
            res.status(400).json({ message: "Internal server error", error: error.message });
        }
    });
}
function signincontroller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const parsedData = Signschema_1.SigninSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: parsedData.error.issues[0].message,
            });
            return;
        }
        try {
            //verify email
            const user = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.findFirst({
                where: {
                    email: parsedData.data.email,
                },
            }));
            if (!user) {
                res.status(400).json({
                    message: "Create an account first"
                });
                return;
            }
            console.log(user);
            if (!(user === null || user === void 0 ? void 0 : user.email_verified)) {
                res.status(400).json({
                    message: "Verify your email first"
                });
                return;
            }
            const ispasswordCorrect = yield bcrypt_1.default.compare(parsedData.data.password, user === null || user === void 0 ? void 0 : user.password);
            if (!ispasswordCorrect) {
                res.status(400).json({
                    message: "Incorrect credentials"
                });
                return;
            }
            const jwtsecret = process.env.JWT_SECRET;
            const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, jwtsecret, { expiresIn: "7d" });
            res.status(200).json({
                message: "signed in successfully",
                token
            });
            return;
        }
        catch (error) {
            res.status(400).json({
                message: "Internal server error",
                error: error === null || error === void 0 ? void 0 : error.message
            });
        }
    });
}
