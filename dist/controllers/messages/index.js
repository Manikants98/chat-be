"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesFn = void 0;
const Messages_1 = require("../../models/Messages");
const Users_1 = require("../../models/Users");
const messagesFn = async (req, res) => {
    if (req.method === 'POST') {
        const { contact_id, message, message_type } = await req.body;
        const token = req.headers.authorization;
        if (!contact_id) {
            return res.status(400).json({ message: 'Missing Name' });
        }
        if (!message) {
            return res.status(400).json({ message: 'Missing Message' });
        }
        if (!message_type) {
            return res.status(400).json({ message: 'Missing Message Type' });
        }
        const newMessage = new Messages_1.Messages({
            contact_id,
            message,
            message_type,
            is_sender: true
        });
        await newMessage.save();
        return res.json({ message: 'Message sent successfully' });
    }
    if (req.method === 'GET') {
        const { contact_id } = req.query;
        console.log(req.query);
        if (!contact_id) {
            return res.status(400).json({ message: 'Missing key contact_id' });
        }
        const token = req.headers.authorization;
        const user = await Users_1.User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: 'Provide Valid Token' });
        }
        const messages = await Messages_1.Messages.find({ contact_id });
        return res.json({ message: 'Messages get successfully', messages });
    }
    return res.status(405).json({ message: `${req.method} method not allowed` });
};
exports.messagesFn = messagesFn;
