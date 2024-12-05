import { app } from "../../app.mjs";
import { getUser } from "../gurad.mjs";
import { Training } from "./trainings.model.mjs";
import { guard } from "../gurad.mjs";
import moment from 'moment';
import { trainingSchema } from "./trainings.joi.mjs";
// import jwt from "jsonwebtoken";


//?  כל האימונים 
app.get('/trainings', async (req, res) => {
    res.send(await Training.find());
});

//? הצגת אימון אחד
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

//? הצגת אימון עפ"י משתמש ספציפי

app.get('/trainings/my-trainings/:userId', guard, async (req, res) => {
    const user = getUser(req);
    
    try {
        const trainings = await Training.find({participants: user._id});        
        
        if (trainings.length === 0) {
            return res.status(404).json({ message: 'No trainings found for this user.' });
        }
        return res.status(200).json(trainings);

    } catch {
        console.error('Error fetching trainings:', error);
        return res.status(500).json({ message: 'Server error.', error });
    }
});

//? יצירת אימון חדש
app.post('/trainings', guard, async (req, res) => {
    try {
        const item = req.body;
        const training = new Training({
            trainingName: item.trainingName,
            trainingDetailes: item.trainingDetailes,
            trainingTime: {
                date: item.trainingTime.date,
                time: item.trainingTime.time,
                length: item.trainingTime.length,
            },
            trainingGuideDetails: {
                first: item.trainingGuideDetails.first,
                last: item.trainingGuideDetails.last,
                phone: item.trainingGuideDetails.phone,
                email: item.trainingGuideDetails.email
            },
            createAt: moment().format('YYYY-MM-DD HH:mm'),
            user_id: getUser(req)?._id,
        });

        const { error } = trainingSchema.validate(req.body);
        if (error) {
            return res.status(400).send({"ValidateError": error.details[0].message.replace(/"/g, '')});
        }
        
        //! לעשות בדיקה אם יש שם שיעור באותו הזמן.

        const newTraining = await training.save();
        res.send(newTraining);
    } catch (error) {
        console.error('Error creating training:', error);
        res.status(500).send('Failed to create training');
    }
});





//? עריכת אימון ספציפי
app.put('/trainings/:id', async (req, res) => {
    try {
        const {
            trainingName,
            trainingDetailes,
            trainingTime: {date, time, length},
            trainingGuideDetails: {first, last, phone, email}
        } = req.body;

        const training = await Training.findById(req.params.id);

        if (!training) {
            return res.status(404).send({"message": "Training not found"});
        }

        const { error } = trainingSchema.validate(req.body);
        if (error) {
            return res.status(400).send({"ValidateError": error.details[0].message.replace(/"/g, '')});
        }

        training.trainingName = trainingName || training.trainingName;
        training.trainingDetailes = trainingDetailes || training.trainingDetailes;
        training.trainingTime = {
            date: date || training.trainingTime.date,
            time: time || training.trainingTime.time,
            length: length || training.trainingTime.length,
        }
        training.trainingGuideDetails = {
            first: first || training.trainingGuideDetails.first,
            last: last || training.trainingGuideDetails.last,
            phone: phone || training.trainingGuideDetails.phone,
            email: email || training.trainingGuideDetails.email
        }

        await training.save();
        res.send(training);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
































//? הוספת משתמש לרשימת משתתפים
app.patch('/trainings/:id', guard, async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        const user = getUser(req);

        if (!training) {
            return res.status(404).json({ message: "Training not found" });
        }

        // בדיקה אם המשתמש כבר ברשימת המשתתפים
        const isRegistered = training.participants.includes(user._id);

        if (!isRegistered) {
            // הוספה לרשימת המשתתפים
            training.participants.push(user._id);
        } else {
            // הסרה מרשימת המשתתפים
            training.participants.pull(user._id);
        }

        await training.save(); // שמירת השינויים

        res.status(200).json(training); // שליחה של האימון המעודכן
    } catch (err) {
        console.error("Error updating training participants:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});


//? מחיקת אימון ספציפי
app.delete('/trainings/:id', async (req, res) => {
    try {
        await Training.findByIdAndDelete(req.params.id);
        res.send({"meassage": "Training is deleted"});
    } catch (err) {
        console.error(err);
        res.status(500).send({"message": "Internal Server Error"});
    }
});