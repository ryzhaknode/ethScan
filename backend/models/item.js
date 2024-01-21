import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    age: String,
});

export const Item = mongoose.model('item', itemSchema);