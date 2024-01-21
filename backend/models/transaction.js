import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    fromAddress: String,
    toAddress: String,
    token: String,
    value: Number,
    hash: String,
    time: Date
});

export const Transaction = mongoose.model('transaction', transactionSchema);