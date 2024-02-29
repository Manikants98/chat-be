"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersFn = void 0;
const users_1 = __importDefault(require("../../models/users"));
async function getUsersFn(req, res) {
    try {
        const token = req.headers.authorization;
        const user = await users_1.default.findOne({ token }).select('-password -token -__v');
        res.status(200).json({ message: "Data Get Successfully", user });
    }
    catch (error) {
        res.status(500).send({ error });
    }
}
exports.getUsersFn = getUsersFn;
