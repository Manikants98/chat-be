"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersFn = void 0;
const users_1 = __importDefault(require("../../models/users"));
/**
 * Handles GET and PUT requests for user data.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {Response} - The Express Response object.
 */
async function getUsersFn(req, res) {
    try {
        if (req.method === 'GET') {
            const token = req.headers.authorization;
            const user = await users_1.default.findOne({ token }).select('-password -token -__v');
            return res.status(200).json({ message: "Data Get Successfully", user });
        }
        else if (req.method === "PUT") {
            const token = req.headers.authorization;
            const { name } = req.body;
            await users_1.default.findOneAndUpdate({ token }, { name }, { new: true });
            return res.status(200).json({ message: "User Updated Successfully" });
        }
        else {
            return res.status(405).json({ message: `${req.method} method not allowed` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.getUsersFn = getUsersFn;
