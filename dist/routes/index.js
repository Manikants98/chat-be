"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = require("../controllers/signup");
const users_1 = require("../models/users");
const signin_1 = require("../controllers/signin");
const route = express_1.default.Router();
route.get('/', async (req, res) => {
    res.send('MKX CHAT APIs');
});
route.get('/users', async (req, res) => {
    const users = await users_1.User.find();
    res.send({ users, message: 'User Get Successfully' });
});
route.post('/signup', signup_1.signUpFn);
route.post('/signin', signin_1.signInFn);
exports.default = route;
