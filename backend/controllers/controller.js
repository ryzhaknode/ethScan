import bcrypt from 'bcrypt'
import {User} from "../models/User.js";
import jwt from "jsonwebtoken"
import {transporter} from "../config/config.js";

import crypto from 'crypto'

export const handleError = (res, error) => {
    res.status(500).json({error});
}

export const postSendPassword = async (req, res, next) => {

    try {
        const {mail} = req.body;

        const user = await User.findOne({mail});

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('Your password 11111');

    } catch (error) {
        console.error(error);

        if (error?.isAxiosError && error.code === 'ERR_NETWORK') {
            // Опрацювання помилки з'єднання з сервером
            return res.status(500).send('Internal Server Error: Unable to connect to the server');
        }

        handleError(res, error)
    }
}

export const postLogin = async (req, res) => {
    try {
        const {mail} = req.body;

        const user = await User.findOne({mail});

        if (!user) {
            return res.status(404).send('User not found');
        }
        // Генеруйте тимчасовий пароль
        const tempPassword = crypto.randomBytes(4).toString('hex');

        // Відправте тимчасовий пароль на електронну пошту користувача
        const mailOptions = {
            from: 'denisrigak1@gmail.com',
            to: mail,
            subject: 'Your Temporary Password',
            text: `Your temporary password is: ${tempPassword}`
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send('Temporary password sent to your email');
        });

    } catch (error) {
        handleError(res, error)
    }
}

export const postRegistration = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            mail: req.body.mail,
            password: hashedPassword,
        });

        console.log(newUser)

        await newUser.save();

        res.status(201).send('User created');
    } catch (error) {
        handleError(res, error)
    }
}

export const postAuthorization = async (req, res) => {
    try {
        // Перевірка користувача
        const user = await User.findOne({mail: req.body.mail});
        if (!user) return res.status(400).send('User not found');

        // Перевірка пароля
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) return res.status(400).send('Invalid password');

        // Створення токена
        const token = jwt.sign({_id: user._id}, 'your_jwt_secret', {expiresIn: '1h'});

        // Відправлення токена у вигляді cookie
        res.cookie('token', token, {httpOnly: true});

        res.send('Logged in successfully');

    } catch (error) {
        handleError(res, error)
    }
}

export const getUsers = async (req, res) => {
    try {
        // Знайти всіх користувачів
        const users = await User.find();

        // Відправити дані у відповідь
        res.json(users);

    } catch (error) {
        handleError(res, error)
    }
}

export const deleteUser = async (req, res) => {
    try {

        // Знайти та видалити
        const deletedUser = await User.findOneAndDelete({mail: req.params.mail});

        console.log(deletedUser)
        if (!deletedUser) return res.status(404).json({message: 'User not found'});

        res.status(200).json({message: 'User deleted successfully'});

    } catch (error) {
        handleError(res, error)
    }
}