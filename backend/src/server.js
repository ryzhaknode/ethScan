import express from 'express';
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import {router} from "../routes/routes.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;
const URL = "mongodb+srv://ryzhaknode:Ryz16091999@cluster0.c5pwidp.mongodb.net/";

const app = express();
app.use(cookieParser());
app.use(express.json());

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