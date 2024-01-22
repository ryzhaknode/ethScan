import {postAuthorization, postRegistration, getUsers, deleteUser} from "../controllers/controller.js";
import express from "express";


export const router = express.Router();

router.post('/register', postRegistration);
router.post('/auth', postAuthorization);
router.get('/users', getUsers);
router.delete('/user/delete/:username', deleteUser);

// router.patch('/movies/:id', updateItem);
