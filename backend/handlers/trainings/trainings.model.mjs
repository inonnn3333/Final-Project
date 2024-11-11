import mongoose ,{ Schema } from "mongoose";

const TrainingGuideDetails = new Schema({
    first: String,
    last: String,
    phone: Number,
    email: {
        type: String,
        unique: true,
    }
});

const TrainingTime = new Schema({
    date: Date,
    time: String,
    length: String,
});


const schema = new Schema({
    trainingName: String,
    trainingDetailes: String,
    time: TrainingTime,
    TrainingGuideDetails: TrainingGuideDetails,
    createAt: String,
    participants: Array,
    isCanceled: Boolean,
});

export const Training = mongoose.model("trainings", schema);
