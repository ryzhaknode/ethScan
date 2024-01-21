import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const withdrawBinanceSchema = new Schema({
    fromAddress: String,
    toAddress: String,
    token: String,
    value: Number,
    hash: String,
    time: Date
});

export const WithdrawBinance = mongoose.model('withdraw_Binance', withdrawBinanceSchema);