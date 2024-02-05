"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messagesSchema = new mongoose_1.default.Schema({
    contact_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Contacts',
        required: true
    },
    message_type: {
        type: String,
        enum: ['image', 'video', 'text', 'document'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    is_read: {
        type: Boolean,
        default: false
    },
    is_sender: {
        type: Boolean,
        default: false
    }
});
exports.Messages = mongoose_1.default.models.messages || mongoose_1.default.model('messages', messagesSchema);
