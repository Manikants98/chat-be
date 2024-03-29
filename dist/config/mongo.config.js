"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uri = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.uri = 'mongodb+srv://dadzheromani:PeWU5zRkj2Wk9DCj@cluster0.tusysu3.mongodb.net/chatsDB?retryWrites=true&w=majority';
const useConnectDB = (req, res, next) => {
    try {
        mongoose_1.default.connect(exports.uri);
        const db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log('MongoDB is Connected');
        });
        next();
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.default = useConnectDB;
