import mongoose from 'mongoose';
const messagesSchema = new mongoose.Schema({
  contact_id: {
    type: mongoose.Schema.Types.ObjectId,
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

export const Messages = mongoose.models.messages || mongoose.model('messages', messagesSchema);
