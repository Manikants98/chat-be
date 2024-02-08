"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesFn = void 0;
const helpers_1 = require("../../helpers");
const Messages_1 = require("../../models/Messages");
const messagesFn = async (req, res) => {
    if (req.method === 'POST') {
        const { contact_id, message, message_type } = await req.body;
        const user = await (0, helpers_1.useUser)(req);
        if (!contact_id) {
            return res.status(400).json({ message: 'Missing key contact_id' });
        }
        if (!message) {
            return res.status(400).json({ message: 'Missing key message' });
        }
        const contact = new Messages_1.Messages({
            contact_id,
            message,
            message_type,
            sender: user._id
        });
        await contact.save();
        return res.json({ message: 'Message sent successfully' });
    }
    if (req.method === 'GET') {
        const { contact_id } = req.query;
        if (!contact_id) {
            return res.status(400).json({ message: 'Missing key contact_id' });
        }
        const { _id, name, email } = await (0, helpers_1.useUser)(req);
        const messages = await Messages_1.Messages.find({ contact_id }).populate([{ path: 'sender', select: 'name email _id' }]);
        return res.json({ message: 'Messages get successfully', messages, user: { _id, name, email } });
    }
    return res.status(405).json({ message: `${req.method} method not allowed` });
};
exports.messagesFn = messagesFn;
