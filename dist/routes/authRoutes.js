"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controllers/Auth/Auth");
const AccountVerification_1 = require("../controllers/Auth/AccountVerification");
const ForgetPassword_1 = __importDefault(require("../controllers/Auth/ForgetPassword"));
const authRouter = express_1.default.Router();
authRouter.post("/signup", Auth_1.signupcontroller);
authRouter.post("/signin", Auth_1.signincontroller);
authRouter.post("/generateotp", AccountVerification_1.generateotp);
authRouter.post("/verifyotp", AccountVerification_1.verifyuser);
authRouter.post("/updatepassword", ForgetPassword_1.default);
exports.default = authRouter;
