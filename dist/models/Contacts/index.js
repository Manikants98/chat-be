"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    avatar: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    mobile_number: {
        type: String,
        validate: {
            validator: (value) => {
                if (value)
                    return /^\d{10}$/.test(value);
                return true;
            },
            message: 'Number must be a 10-digit string.'
        }
    },
    instagram: {
        type: String
    },
    linkedin: {
        type: String
    },
    contact_type: {
        type: String
    },
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    unread_count: {
        type: Number
    },
    status: {
        type: String
    },
    recent_message: {
        type: Object
    },
    last_modified_date: {
        type: Date,
        default: Date.now
    }
});
exports.Contact = mongoose_1.default.models.contacts || mongoose_1.default.model('contacts', contactSchema);
