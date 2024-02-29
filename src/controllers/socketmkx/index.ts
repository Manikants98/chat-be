import mongoose from "mongoose";
import { Socket } from "socket.io";
import { uri } from "../../config/mongo.config";
import { Messages } from "../../models/Messages";
import User from "../../models/users";

export const socketFn = async (socket: Socket, _io: any) => {
    await mongoose.connect(uri)
    console.log("MongoDB Connected")
    try {
        socket.on('Authenticate', async (requestBody: { user_id: string, contact_id: string }, socketId: string) => {
            console.log("Authenticate Event Triggered");
            const { user_id, contact_id } = requestBody
            const { _id, name, email } = await User.findById(user_id)
            const messages = await Messages.find({ contact_id: contact_id }).populate([{ path: 'sender', select: 'name email _id' }]);
            socket.emit("Messages", { message: 'Messages get successfully', messages, user: { _id, name, email } })

            socket.on('sendMessage', async (requestBody: { contact_id: string; message: string | object; message_type: 'image' | 'video' | 'text' | 'document'; sender: string; }) => {
                console.log("sendMessage Event Triggered");
                const { contact_id, message, message_type, sender } = requestBody;
                try {
                    const newMessage = new Messages({
                        contact_id,
                        message,
                        message_type,
                        sender
                    });
                    
                    await newMessage.save();
                    socket.broadcast.emit("newMessage", newMessage);
                    socket.emit("newMessage", newMessage);

                } catch (error) {
                    console.error("Error saving message:", error);
                    socket.emit("error", { message: "Error saving message" });
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
}


//first of all connect mongodb

//fetch and modifies messages data

//then emiit the data to the client according to authentications

//then handle send message event store in the db with message , message_type and who is sender

//now send the new messages to the client by Socket ID

//may be i have to make room wise chat