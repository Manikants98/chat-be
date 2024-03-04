"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketFn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongo_config_1 = require("../../config/mongo.config");
const Messages_1 = require("../../models/Messages");
/**
 * Function to handle socket events and emit messages to the client
 * @param {Socket} socket - The socket object
 * @param {number} page - The page number for pagination (default: 1)
 * @param {number} limit - The limit of messages per page (default: 20)
 */
const socketFn = async (socket, page = 1, limit = 20) => {
    await mongoose_1.default.connect(mongo_config_1.uri);
    console.log('Mongo Connected');
    try {
        let messages = [];
        let reqbody = {};
        socket.on('authentication', async (response) => {
            console.log('mkx');
            const { user_id, contact_id } = response;
            reqbody = response;
            messages = await Messages_1.Messages.find({ contact_id })
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ _id: -1 });
            socket.emit('messages', { messages });
            console.log('Messages Sent', messages);
            console.log('Messages reqbody', reqbody);
        });
    }
    catch (error) {
        socket.emit('error', { error });
    }
};
exports.socketFn = socketFn;
