import mongoose, { Schema } from 'mongoose';


const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export const Message = mongoose.model('messages', messageSchema);
