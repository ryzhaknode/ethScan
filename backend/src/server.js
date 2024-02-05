import express from 'express';
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import {router} from "../routes/routes.js";
import mongoose from "mongoose";
import {connectDB} from "./db.js";
import cors from "cors"


const PORT = process.env.PORT || 5001;

const app = express();

app.use(cookieParser());
app.use(express.json());



// Використовуйте CORS для всіх запитів
app.use(cors());

connectDB()

const csrfProtection = csrf({cookie: true});
app.get('/sanctum/csrf-cookie', csrfProtection, (req, res) => {
    res.json({csrfToken: req.csrfToken()});
});


mongoose
    .connect(URL)
    .then((res) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`Помилка підключення до БД: ${err}`));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`listening port ${PORT}`);
});

app.use(router);
