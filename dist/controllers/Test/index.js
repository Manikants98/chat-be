"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFn = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const Messages_1 = require("../../models/Messages");
const mongo_config_1 = require("../../config/mongo.config");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const testFn = async (socket) => {
    console.log('Socket Connected');
    try {
        await mongoose_1.default.connect(mongo_config_1.uri);
        console.log('MongoDB Connected');
        socket.on('getMessages', async () => {
            console.log('Event Triggered');
            try {
                const option = [{ path: 'sender', select: 'name email _id' }];
                const messages = await Messages_1.Messages.find({ contact_id: '65c1fa406709e451bc22f928' }).populate(option);
                console.log('Messages sent to Client');
                socket.emit('messages', { message: 'Messages get successfully', messages });
            }
            catch (error) {
                console.error('Error fetching messages:', error);
                socket.emit('error', { message: 'Error fetching messages' });
            }
        });
        socket.on('sendMessage', async (data) => {
            console.log('sendMessage Triggered');
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
            io.emit('getMessages', { message: 'Message sent successfully' });
        });
        socket.on('disconnect', () => {
            console.log('Socket Disconnected');
        });
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        socket.emit('error', { message: 'Error connecting to MongoDB' });
    }
};
exports.testFn = testFn;
