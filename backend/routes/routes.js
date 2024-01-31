import {
    postAuthorization,
    postRegistration,
    getUsers,
    deleteUser,
    postSendPassword
} from "../controllers/controller.js";
import express from "express";


export const router = express.Router();

router.post('/register', postRegistration);
router.post('/send-password', postSendPassword);
router.post('/auth', postAuthorization);
router.get('/users', getUsers);
router.delete('/user/delete/:mail', deleteUser);

// router.patch('/movies/:id', updateItem);
