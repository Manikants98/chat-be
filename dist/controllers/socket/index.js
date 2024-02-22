"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketEvents = void 0;
const Messages_1 = require("../../models/Messages");
const mongoose_1 = __importDefault(require("mongoose"));
const mongo_config_1 = require("../../config/mongo.config");
const registerSocketEvents = async (io) => {
    await mongoose_1.default.connect(mongo_config_1.uri);
    console.log('MongoDB Connected');
    io.on("connection", async (socket) => {
        console.log("Client connected:", socket.id);
        try {
            const messages = await Messages_1.Messages.find();
            socket.emit("messages", messages);
        }
        catch (error) {
            console.error("Error fetching messages:", error);
            socket.emit("error", { message: "Error fetching messages" });
        }
        socket.on("sendMessage", async (messageData) => {
            console.log("sendMessage event triggered");
            const { contact_id, message, message_type, sender = "65bfbe2faecd8c9efc906200" } = messageData;
            if (!contact_id || !message) {
                socket.emit("error", { message: "Missing required fields" });
                return;
            }
            try {
                const newMessage = new Messages_1.Messages({
                    contact_id,
                    message,
                    message_type,
                    sender
                });
                await newMessage.save();
                io.emit("newMessage", newMessage); // Emit 'newMessage' instead of 'messages'
            }
            catch (error) {
                console.error("Error saving message:", error);
                socket.emit("error", { message: "Error saving message" });
            }
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};
exports.registerSocketEvents = registerSocketEvents;
