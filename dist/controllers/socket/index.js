"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketFn = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const mongo_config_1 = require("../../config/mongo.config");
const Messages_1 = require("../../models/Messages");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const socketFn = async (socket) => {
    console.log('A user connected');
    await mongoose_1.default.connect(mongo_config_1.uri);
    socket.on('sendMessage', async (data) => {
        const { contact_id, message, message_type, sender } = data;
        if (!contact_id) {
            return socket.emit('error', { message: 'Missing key contact_id' });
        }
        if (!message) {
            return socket.emit('error', { message: 'Missing key message' });
        }
        const contact = new Messages_1.Messages({
            contact_id,
            message,
            message_type,
            sender
        });
        await contact.save();
        io.emit('newMessage', { message: 'Message sent successfully' });
    });
    socket.on('getMessages', async () => {
        const messages = await Messages_1.Messages.find({ contact_id: '65c1fa406709e451bc22f928' }).populate([
            { path: 'sender', select: 'name email _id' }
        ]);
        console.log('mkx');
        socket.emit('messages', { message: 'Messages get successfully', messages });
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
};
exports.socketFn = socketFn;
