import { app } from "../../app.mjs";
import { Training } from "./trainings.model.mjs";

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


app.get('/trainings/my-trainings', async (req, res) => {
    
});


app.put('/trainings/:id', async (req, res) => {
});


app.patch('/trainings/:id', async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) return res.status(403).send("Trainig not found");
    
        training.isCanceled = !training.isCanceled;
        await training.save();
    
        res.send(training);
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