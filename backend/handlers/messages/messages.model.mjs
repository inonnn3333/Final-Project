import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: String
    }
});

export const Message = mongoose.model('messages', messageSchema);
