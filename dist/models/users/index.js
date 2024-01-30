"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    profile_picture: {
        type: String
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    last_name: {
        type: String,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token: {
        type: String,
        required: true
    },
    mobile_number: {
        type: Number
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    business_category_id: {
        type: String
    },
    business_subcategory_id: {
        type: String
    },
    country_id: {
        type: String
    },
    state_id: {
        type: String
    },
    city_id: {
        type: String
    },
    area: {
        type: String
    },
    pincode: {
        type: Number
    },
    instagram: {
        type: String
    },
    linkedin: {
        type: String
    },
    role: {
        type: String
    },
    last_modified_date: {
        type: Date,
        default: Date.now
    }
});
exports.User = mongoose_1.default.models.users || mongoose_1.default.model('users', userSchema);
