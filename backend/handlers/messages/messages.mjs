import { app } from "../../app.mjs";
import { Message } from "./messages.model.mjs";

app.get('/messages', async (req, res) => {
    res.send(await Message.find());
});


//? הוספת הודעה חדשה
app.post('/messages', async (req, res) => {
    try {
        const item = req.body;
        const message = new Message({
            content: item.content,
            timestamp: item.timestamp
        });
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ message: 'Server error.', error });
    }
});


//? עדכון הודעה
app.patch('/messages/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).send({ message: 'Message not found' });
        }
        message.content = req.body.content;
        await message.save();
        res.send(message);
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ message: 'Server error.', error });
    }
});


//? מחיקת הודעה 
app.delete('/messages/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.send({"message": "Message is deleted"});
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ message: 'Server error.', error });
    }
});