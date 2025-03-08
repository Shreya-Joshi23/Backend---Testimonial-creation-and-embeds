"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
function passwordCallback(password) {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    return hasUpper && hasLower && hasNumber && hasSpecial;
}
exports.SignupSchema = zod_1.z.object({
    name: zod_1.z.string().max(20, { message: "Exceeding the character limits of name" }).min(2, { message: "Minimum length can be 2" }),
    email: zod_1.z.string().email({ message: "Enter correct email format" }),
    password: zod_1.z.string().refine((password) => passwordCallback(password), { message: "Password must contain at least one uppercase, lowercase letter, and number" })
});
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Enter correct email format" }),
    password: zod_1.z.string()
});
