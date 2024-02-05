import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
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
      validator: (value: string) => {
        if (value) return /^\d{10}$/.test(value);
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
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

export const Contact = mongoose.models.contacts || mongoose.model('contacts', contactSchema);
