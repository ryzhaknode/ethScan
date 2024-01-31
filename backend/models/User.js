import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    mail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export const User = mongoose.model('user', userSchema);