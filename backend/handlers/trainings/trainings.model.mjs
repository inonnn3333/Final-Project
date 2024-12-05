import mongoose ,{ Schema } from "mongoose";

const TrainingGuideDetails = new Schema({
    first: String,
    last: String,
    phone: String,
    email: String
});

const TrainingTime = new Schema({
    date: String,
    time: String,
    length: Number,
});


const schema = new Schema({
    trainingName: String,
    trainingDetailes: String,
    trainingTime: TrainingTime,
    trainingGuideDetails: TrainingGuideDetails,
    createAt: String,
    participants: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    isCanceled: Boolean,
    user_id: {
        type: Schema.Types.ObjectId,
    }
});

export const Training = mongoose.model("trainings", schema);
