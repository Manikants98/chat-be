"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsFn = void 0;
const Contacts_1 = require("../../models/Contacts");
const Users_1 = __importDefault(require("../../models/Users"));
const contactsFn = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, mobile_number, instagram = 'https://instagram.com/', linkedin = 'https://linkedin.com/', contact_type = 'General' } = await req.body;
        const token = req.headers.authorization;
        if (!name) {
            return res.status(400).json({ message: 'Please enter your name' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Please enter your email' });
        }
        const user = await Users_1.default.findOne({ token });
        const isContact = await Contacts_1.Contact.findOne({ email, sender: user._id });
        if (isContact) {
            return res.json({ message: 'Contact already exist' });
        }
        const receiver = await Users_1.default.findOne({ email });
        const contact = new Contacts_1.Contact({
            name,
            email,
            mobile_number,
            instagram,
            linkedin,
            contact_type,
            sender: user._id,
            receiver: receiver ? receiver?._id : null
        });
        await contact.save();
        return res.json({ message: 'Contact created successfully' });
    }
    if (req.method === 'GET') {
        const user = await Users_1.default.findOne({ token: req.headers.authorization });
        const data = await Contacts_1.Contact.find({ $or: [{ receiver: user._id }, { sender: user._id }] }).populate([
            { path: 'receiver', select: '-password -token' },
            { path: 'sender', select: '-password -token' }
        ]);
        const contacts = data.map(contact => {
            const other = contact.receiver && contact.receiver.equals(user._id) ? contact.sender : contact.receiver;
            return {
                _id: contact._id,
                name: contact.name,
                email: other ? other.email : contact.email,
                created_date: contact.created_date,
                last_modified_date: contact.last_modified_date,
                is_chat_active: !!other
            };
        });
        return res.json({ message: 'Contacts get successfully', contacts });
    }
    return res.status(405).json({ message: `${req.method} method not allowed` });
};
exports.contactsFn = contactsFn;
