"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_config_1 = __importDefault(require("../config/mongo.config"));
const user_1 = __importDefault(require("../schemas/user"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    (0, mongo_config_1.default)();
    const users = await user_1.default.find();
    res.send({ users, message: 'User Get Successfully' });
});
router.get('/mani', (req, res) => {
    res.send('Hello, Mani!');
});
exports.default = router;
