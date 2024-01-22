import express from 'express';
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import {router} from "../routes/routes.js";
import mongoose from "mongoose";
import {connectDB} from "./db.js";

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cookieParser());
app.use(express.json());

connectDB()

// mongoose.connect('your_connection_string', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // інші опції за потреби
// }).then(() => {
//     console.log('MongoDB connected');
// }).catch((error) => {
//     console.error('MongoDB connection failed:', error.message);
// });

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