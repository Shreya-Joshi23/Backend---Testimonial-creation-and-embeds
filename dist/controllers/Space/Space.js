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
exports.addspace = addspace;
exports.getuserspaces = getuserspaces;
exports.updatespace = updatespace;
exports.deletespace = deletespace;
const db_1 = __importDefault(require("../../db"));
const slugify_1 = __importDefault(require("slugify"));
function addspace(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description } = req.body;
        try {
            const userId = req.userId;
            console.log(userId);
            if (!userId) {
                res.status(400).json({
                    message: "UserId not defined.Space creation request failed"
                });
                return;
            }
            const space = yield (db_1.default === null || db_1.default === void 0 ? void 0 : db_1.default.spaces.create({
                data: {
                    userId,
                    title,
                    // @ts-ignore
                    description,
                    slug: (0, slugify_1.default)(title, { lower: true, strict: true })
                },
                omit: {
                    userId: true
                }
            }));
            res.status(200).json({
                message: "Space created successfully",
                space
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
function getuserspaces(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        try {
            const spaces = yield (db_1.default === null || db_1.default === void 0 ? void 0 : db_1.default.spaces.findMany({
                where: {
                    userId: userId
                },
                orderBy: {
                    "createdAt": "asc"
                }
            }));
            res.status(200).json({
                message: "Spaces fetched sccessfully",
                spaces
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
function updatespace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const spaceId = req.params.id;
        const { title, description } = req.body;
        try {
            const updatedspace = yield (db_1.default === null || db_1.default === void 0 ? void 0 : db_1.default.spaces.update({
                where: {
                    id: spaceId
                },
                data: {
                    title,
                    description,
                    slug: (0, slugify_1.default)(title, { lower: true, strict: true })
                },
                omit: {
                    id: true
                }
            }));
            res.status(200).json({
                message: "Space updated successfully",
                updatedspace
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
function deletespace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const spaceId = req.params.id;
        try {
            yield (db_1.default === null || db_1.default === void 0 ? void 0 : db_1.default.spaces.delete({
                where: {
                    id: spaceId
                }
            }));
            res.status(200).json({
                message: "Space deleted successfully"
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
