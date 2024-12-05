import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from "morgan";
import chalk from 'chalk';
import moment from 'moment';


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

app.use(morgan(function (tokens, req, res) {
    const status = tokens.status(req, res)
    
        return [
            chalk.blue(tokens.method(req, res)),
            chalk.green(tokens.url(req, res)),
            status >= 200 && status < 400 ? chalk.bgGreen(tokens.status(req, res)) : chalk.bgRed(tokens.status(req, res)),
            chalk.red(moment().format('YYYY-MM-DD HH:mm')), '-',
            chalk.bgBlack(tokens['response-time'](req, res)), 'ms'
        ].join(' ')
    }
));  

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