"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpFn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUpFn = async (req, res) => {
    const { name, email, password, role = 'User' } = await req.body;
    if (!name) {
        return res.status(400).json({ message: 'Please enter your first name' });
    }
    if (!email) {
        return res.status(400).json({ message: 'Please enter your email' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Please enter your password' });
    }
    // const users = await User.findOne({ email: email });
    // if (users) {
    //   return res.status(400).json({ message: 'This email already exists.' });
    // }
    const token = jsonwebtoken_1.default.sign({ email, role }, 'MkxReactJsDev');
    // const user = new User({
    //   name,
    //   email,
    //   token,
    //   password: await bcrypt.hash(password, 10)
    // });
    // await user.save();
    return res.json({ message: 'User registered successfully', token });
};
exports.signUpFn = signUpFn;
