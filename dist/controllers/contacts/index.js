"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsFn = void 0;
const Contacts_1 = require("../../models/Contacts");
const users_1 = __importDefault(require("../../models/users"));
const helpers_1 = require("../../helpers");
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
        const user = await users_1.default.findOne({ token });
        const isContact = await Contacts_1.Contact.findOne({ email, sender: user._id });
        if (isContact) {
            return res.json({ message: 'Contact already exist' });
        }
        const receiver = await users_1.default.findOne({ email });
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
        const { contact_id } = req.query;
        const user = await (0, helpers_1.useUser)(req);
        try {
            if (contact_id) {
                const contact = await Contacts_1.Contact.findById(contact_id).populate([
                    { path: 'receiver', select: '-password -token' },
                    { path: 'sender', select: '-password -token' }
                ]);
                if (!contact) {
                    return res.status(404).json({ message: 'Contact not found' });
                }
                return res.json({ message: 'Contact retrieved successfully', contact });
            }
            const contacts = await Contacts_1.Contact.aggregate([
                {
                    $match: {
                        $or: [{ receiver: user._id }, { sender: user._id }]
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'receiver',
                        foreignField: '_id',
                        as: 'receiver'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'sender',
                        foreignField: '_id',
                        as: 'sender'
                    }
                },
                {
                    $addFields: {
                        other: {
                            $cond: {
                                if: { $eq: ['$receiver._id', user._id] },
                                then: '$sender',
                                else: '$receiver'
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        mobile_number: 1,
                        email: {
                            $cond: [
                                { $gt: [{ $size: '$other' }, 0] },
                                { $arrayElemAt: ['$other.email', 0] },
                                { $ifNull: ['$email', null] }
                            ]
                        },
                        created_date: 1,
                        last_modified_date: 1,
                        is_chat_active: {
                            $cond: { if: { $or: ['$receiver', '$sender'] }, then: true, else: false }
                        }
                    }
                }
            ]);
            return res.json({ message: 'Contacts retrieved successfully', contacts });
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    return res.status(405).json({ message: `${req.method} method not allowed` });
};
exports.contactsFn = contactsFn;
