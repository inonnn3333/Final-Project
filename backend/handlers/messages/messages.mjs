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