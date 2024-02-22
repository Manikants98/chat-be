import { Server, Socket } from "socket.io";
import { Messages } from "../../models/Messages";
import mongoose from "mongoose";
import { uri } from "../../config/mongo.config";

export const registerSocketEvents = async (io: Server) => {
  await mongoose.connect(uri);
  console.log('MongoDB Connected')
  io.on("connection", async (socket: Socket) => {
    console.log("Client connected:", socket.id);
    try {
      const messages = await Messages.find();
      socket.emit("messages", messages);

    } catch (error) {
      console.error("Error fetching messages:", error);
      socket.emit("error", { message: "Error fetching messages" });
    }

    socket.on("sendMessage", async (messageData: { contact_id: string; message: string | object; message_type: 'image' | 'video' | 'text' | 'document'; sender: string; }) => {
      console.log("sendMessage event triggered");
      const { contact_id, message, message_type, sender = "65bfbe2faecd8c9efc906200" } = messageData;

      if (!contact_id || !message) {
        socket.emit("error", { message: "Missing required fields" });
        return;
      }

      try {
        const newMessage = new Messages({
          contact_id,
          message,
          message_type,
          sender
        });
        await newMessage.save();
        io.emit("newMessage", newMessage); // Emit 'newMessage' instead of 'messages'
      } catch (error) {
        console.error("Error saving message:", error);
        socket.emit("error", { message: "Error saving message" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
