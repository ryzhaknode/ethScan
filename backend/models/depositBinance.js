import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const depositBinanceSchema = new Schema({
    fromAddress: String,
    toAddress: String,
    token: String,
    value: Number,
    hash: String,
    time: Date
});

export const DepositBinance = mongoose.model('deposit_Binance', depositBinanceSchema);