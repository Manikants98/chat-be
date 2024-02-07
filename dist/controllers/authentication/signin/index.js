"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInFn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = __importDefault(require("../../../models/Users"));
const signInFn = async (req, res) => {
    const { email, password } = await req.body;
    try {
        if (!email) {
            return res.status(400).json({ message: 'Please enter your email' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Please enter your password' });
        }
        const user = await Users_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Oops! You have enterd incorrect email.' });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Oops! You have enterd incorrect password.' });
        }
        return res.status(200).json({ message: 'Login successful', token: user.token });
    }
    catch (error) {
        return res.status(500).json({ error: 'Login failed. Please try again later' });
    }
};
exports.signInFn = signInFn;
