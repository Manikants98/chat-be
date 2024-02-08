"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = exports.useToken = void 0;
const users_1 = __importDefault(require("../models/users"));
const useToken = (req) => req.headers.authorization;
exports.useToken = useToken;
const useUser = async (req) => {
    const token = (0, exports.useToken)(req);
    const user = await users_1.default.findOne({ token });
    return user;
};
exports.useUser = useUser;
