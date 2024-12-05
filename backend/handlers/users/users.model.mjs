import mongoose ,{ Schema } from "mongoose";

const Name = new Schema({
    first: String,
    last: String
});

const Address = new Schema({
    city: String,
    street: String,
    houseNumber: Number,
});


const schema = new Schema({
    name: Name,
    phone: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    address: Address,
    isAdmin: {
        type: Boolean,
        default: false
    },
    createAt: String,
    isActive: Boolean,
});

export const User = mongoose.model("users", schema);
