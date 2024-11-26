import { app } from "../../app.mjs";
import { getUser } from "../gurad.mjs";
import { Training } from "./trainings.model.mjs";
import { guard } from "../gurad.mjs";
import moment from 'moment';
import jwt from "jsonwebtoken";


app.get('/trainings', async (req, res) => {
    res.send(await Training.find());
});


app.get('/trainings/:id', async (req, res) => {
    try {
        const training = await Training.findById(req.params.id)

    if (!training) {
        return res.status(403).send({message: "Training not found"});
    }

    res.send(training);
    } catch (err) {
        console.error(err);
        res.status(500).send({"message": "Internal Server Error"});
    }
});


app.get('/trainings/my-trainings', guard, async (req, res) => {
    const user = getUser(req);
    res.send(await Training.find({participants: user._id}));
});



app.post('/trainings', guard, async (req, res) => {
    try {
        const item = req.body;
        const training = new Training({
            trainingName: item.trainingName,
            trainingDetailes: item.trainingDetailes,
            time: {
                date: item.TrainingTime.date,
                time: item.TrainingTime.time,
                length: item.TrainingTime.length,
            },
            TrainingGuideDetails: {
                first: item.TrainingGuideDetails.first,
                last: item.TrainingGuideDetails.last,
                phone: item.TrainingGuideDetails.phone,
                email: item.TrainingGuideDetails.email
            },
            createAt: moment().format('YYYY-MM-DD HH:mm'),
            user_id: getUser(req)?._id,
        });

        //! VALIDATION !
        
        //! לעשות בדיקה אם יש שם שיעור באותו הזמן.
        const newTraining = await training.save();
        res.send(newTraining);
    } catch (error) {
        console.error('Error creating training:', error);
        res.status(500).send('Failed to create training');
    }
});



app.put('/trainings/:id', async (req, res) => {
});


app.patch('/trainings/:id', guard, async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        const user = getUser(req);

        if (!training) return res.status(403).send("Trainig not found");
    
        const find = training.participants.includes(user._id);

        if (!find) {
            training.participants.push(user._id);
        } else {
            const index = training.participants.indexOf(user._id);
            if (index !== -1) {
                training.participants.splice(index, 1);
            }
        }
        const updateTraining = await training.save();
        res.send(updateTraining);
    } catch (err) {
        console.error(err);
        res.status(500).send({"message": "Internal Server Error"});
    }
});

app.delete('/trainings/:id', async (req, res) => {
    try {
        await Training.findByIdAndDelete(req.params.id);
        res.send({"meassage": "Training is deleted"});
    } catch (err) {
        console.error(err);
        res.status(500).send({"message": "Internal Server Error"});
    }
});