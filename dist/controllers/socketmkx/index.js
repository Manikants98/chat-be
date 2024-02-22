"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketFn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongo_config_1 = require("../../config/mongo.config");
const users_1 = __importDefault(require("../../models/users"));
const Messages_1 = require("../../models/Messages");
const socketFn = async (socket, io) => {
    await mongoose_1.default.connect(mongo_config_1.uri);
    console.log("MongoDB Connected");
    socket.on('Authenticate', async (requestBody, socketId) => {
        console.log("Authenticate Event Triggered");
        const { user_id, contact_id } = requestBody;
        try {
            const { _id, name, email } = await users_1.default.findById(user_id);
            const messages = await Messages_1.Messages.find({ contact_id: contact_id }).populate([{ path: 'sender', select: 'name email _id' }]);
            socket.emit("Messages", { message: 'Messages get successfully', messages, user: { _id, name, email } });
            socket.on('sendMessage', async (requestBody) => {
                console.log("newMessage Event Triggered");
                const { contact_id, message, message_type, sender } = requestBody;
                try {
                    const newMessage = new Messages_1.Messages({
                        contact_id,
                        message,
                        message_type,
                        sender
                    });
                    await newMessage.save();
                    socket.broadcast.emit("newMessage", newMessage);
                }
                catch (error) {
                    console.error("Error saving message:", error);
                    socket.emit("error", { message: "Error saving message" });
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    //first of all connect mongodb
    //fetch and modifies messages data
    //then emiit the data to the client according to authentications
    //then handle send message event store in the db with message , message_type and who is sender
    //now send the new messages to the client by Socket ID
    //may be i have to make room wise chat
};
exports.socketFn = socketFn;
