import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

async function main () {
    try {
        //! In "connection" variable, I need to add a condition: if the DB is LOCAL or from CLOUD.
        const connection = "mongodb://127.0.0.1:27017/finalProject";
        await mongoose.connect(connection);
        console.log((' Database connected '));
    } catch (err) {
        console.error(chalk.red("Error connecting to database: " + err));
    }
}
main().catch(err => console.error((err)));


export const app = express();

app.use(express.json()); // In this line of code, Im using json format.

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

app.listen( 1010, () => {
    console.log("Server is running on port 1010");
})

app.get('/', (req, res) => {
    res.send ({message: "main."});
})

import ('./handlers/users/users.mjs');
import ('./handlers/users/auth.mjs');
import ('./handlers/trainings/trainings.mjs');