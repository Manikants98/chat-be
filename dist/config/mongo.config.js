"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uri = 'mongodb+srv://dadzheromani:PeWU5zRkj2Wk9DCj@cluster0.tusysu3.mongodb.net/chatsDB?retryWrites=true&w=majority';
const useConnectDB = () => {
    try {
        mongoose_1.default.connect(uri);
        const db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log('Connected to MongoDB');
        });
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
exports.default = useConnectDB;
