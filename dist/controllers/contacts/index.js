"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsFn = void 0;
const Contacts_1 = require("../../models/Contacts");
const Users_1 = require("../../models/Users");
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
        const user = await Users_1.User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: 'Provide Valid Token' });
        }
        const isContact = await Contacts_1.Contact.findOne({ email, sender: user._id });
        if (isContact) {
            return res.json({ message: 'Contact already exist' });
        }
        const receiver = await Users_1.User.findOne({ email });
        const contact = new Contacts_1.Contact({
            name,
            email,
            mobile_number,
            instagram,
            linkedin,
            contact_type,
            sender: user._id,
            receiver: receiver ? receiver._id : null
        });
        await contact.save();
        return res.json({ message: 'Contact created successfully' });
    }
    if (req.method === 'GET') {
        const token = req.headers.authorization;
        const user = await Users_1.User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: 'Provide Valid Token' });
        }
        const senderContacts = await Contacts_1.Contact.find({ sender: user._id });
        const receiverContacts = await Contacts_1.Contact.find({ receiver: user._id });
        const contacts = senderContacts.concat(receiverContacts);
        return res.json({ message: 'Contacts get successfully', contacts });
    }
    return res.status(405).json({ message: `${req.method} method not allowed` });
};
exports.contactsFn = contactsFn;
