"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const signup_1 = require("../controllers/authentication/signup");
const signin_1 = require("../controllers/authentication/signin");
const contacts_1 = require("../controllers/contacts");
const messages_1 = require("../controllers/messages");
const route = express_1.default.Router();
route.get('/', (req, res) => {
    res.send('MKX CHAT APIs');
});
route.all('/users', users_1.getUsersFn);
route.post('/signup', signup_1.signUpFn);
route.post('/signin', signin_1.signInFn);
route.all('/contacts', contacts_1.contactsFn);
route.all('/messages', messages_1.messagesFn);
exports.default = route;
