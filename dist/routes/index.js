"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.get('/', (req, res) => {
    res.send('MKX CHAT APIs');
});
// route.all('/users', getUsersFn);
// route.post('/signup', signUpFn);
// route.post('/signin', signInFn);
// route.all('/contacts', contactsFn);
// route.all('/messages', messagesFn);
exports.default = route;
