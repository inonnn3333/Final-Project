import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


async function main () {
    try {
        const connection = process.env.NODE_ENV === 'development' ? process.env.MONGO_DB_URL : process.env.ATLAS_URL;
        await mongoose.connect(connection);
        console.log((' Database connected '));
    } catch (err) {
        console.error(("Error connecting to database: " + err));
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