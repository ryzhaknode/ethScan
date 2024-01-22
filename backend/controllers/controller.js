import bcrypt from 'bcrypt'
import {User} from "../models/User.js";
import jwt from "jsonwebtoken"

export const handleError = (res, error) => {
    res.status(500).json({error});
}


export const postRegistration = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).send('User created');
    } catch (error) {
        handleError(res, error)
    }
}

export const postAuthorization = async (req, res) => {
    try {
        // Перевірка користувача
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send('User not found');

        // Перевірка пароля
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) return res.status(400).send('Invalid password');

        // Створення токена
        const token = jwt.sign({ _id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Відправлення токена у вигляді cookie
        res.cookie('token', token, { httpOnly: true });

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
        const deletedUser = await User.findOneAndDelete({ username: req.params.username });

        console.log(deletedUser)
        if(!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        handleError(res, error)
    }
}