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
    date: String,
    time: String,
    length: String,
});


const schema = new Schema({
    trainingName: String,
    trainingDetailes: String,
    time: TrainingTime,
    TrainingGuideDetails: TrainingGuideDetails,
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
