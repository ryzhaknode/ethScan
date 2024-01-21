import {getItems, getItem, deleteItem, addItem, updateItem, getTransaction} from "../controllers/controller.js";
import express from "express";


export const router = express.Router();

router.post('/', getTransaction);
router.get('/items', getItems);
router.get('/item/:name', getItem);
router.delete('/item/:name', deleteItem);
router.post('/item', addItem);

// router.patch('/movies/:id', updateItem);
