"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesFn = void 0;
const Messages_1 = require("../../models/Messages");
const messagesFn = async (req, res) => {
    if (req.method === 'POST') {
        const { contact_id, message, message_type } = await req.body;
        if (!contact_id) {
            return res.status(400).json({ message: 'Missing key contact_id' });
        }
        if (!message) {
            return res.status(400).json({ message: 'Missing key message' });
        }
        const contact = new Messages_1.Messages({
            contact_id,
            message,
            message_type
        });
        await contact.save();
        return res.json({ message: 'Message sent successfully' });
    }
    if (req.method === 'GET') {
        const { contact_id } = req.query;
        if (!contact_id) {
            return res.status(400).json({ message: 'Missing key contact_id' });
        }
        const messages = await Messages_1.Messages.find({ contact_id });
        return res.json({ message: 'Messages get successfully', messages });
    }
    return res.status(405).json({ message: `${req.method} method not allowed` });
};
exports.messagesFn = messagesFn;
