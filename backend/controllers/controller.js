import {Item} from "../models/item.js";
import {Transaction} from "../models/transaction.js";
import {binanceWallets} from "../config/config.js";
import {WithdrawBinance} from "../models/withdrawBinance.js";
import {DepositBinance} from "../models/depositBinance.js";


export const handleError = (res, error) => {
    res.status(500).json({error});
}


export const getTransaction = async (req, res) => {
    try {
        const activity = req.body?.event?.activity?.[0]
        if (!activity) {
            return res.status(400).send('Activity data not found');
        }

        const transactionData = {
            fromAddress: activity?.fromAddress,
            toAddress: activity?.toAddress,
            token: activity?.asset,
            value: activity?.value,
            hash: activity?.hash,
            time: new Date()
        }

        if (transactionData.token.toLowerCase() === "usdt" && transactionData.value > 10000 ) {

            if(binanceWallets.some(wallet => wallet.toLowerCase() === transactionData.fromAddress.toLowerCase())
                && binanceWallets.some(wallet => wallet.toLowerCase() !== transactionData.toAddress.toLowerCase())){
                const newWithdrawBinance = new WithdrawBinance(transactionData)
                const result = await newWithdrawBinance.save();
            }

            if(binanceWallets.some(wallet => wallet.toLowerCase() === transactionData.toAddress.toLowerCase())
                && binanceWallets.some(wallet => wallet.toLowerCase() !== transactionData.fromAddress.toLowerCase())){
                const newDepositBinance = new DepositBinance(transactionData)
                const result = await newDepositBinance.save();
            }


            const newTransaction = new Transaction(transactionData)
            const result = await newTransaction.save();

            // await newTransaction
            //     .save()
            //     .then((result) => {
            //         res
            //             .status(201)
            //             .json(result);
            //     })
            //     .catch((err) => handleError(res, err));
            console.log(result);

            console.log(transactionData);
        }
        // console.log(transactionData.value);
    } catch (e) {
        console.error(e);
        // Перевірка, чи відповідь вже відправлена
        if (!res.headersSent) {
            res.status(500).json({error: e.message});
        }
    } finally {

    }
    // console.log('Вебхук отримано з даними "activity":', req.body?.event?.activity);

    // Обробка даних вебхука тут...
    // ...

    res.status(200).send('Вебхук отримано');
}
export const getItems = (req, res) => {
    Item
        .find()
        .sort({title: 1})
        .then((items) => {
            res
                .status(200)
                .json(items);
        })
        .catch((err) => handleError(res, err));
};

export const getItem = (req, res) => {
    Item
        .findOne({name: req.params.name})
        .then((movie) => {
            res
                .status(200)
                .json(movie);
        })
        .catch((err) => handleError(res, err));
};

export const deleteItem = (req, res) => {
    Item
        .findOneAndDelete({name: req.params.name})
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch((err) => handleError(res, err));
};

export const addItem = (req, res) => {
    const newItem = new Item(req.body);
    newItem
        .save()
        .then((result) => {
            res
                .status(201)
                .json(result);
        })
        .catch((err) => handleError(res, err));
};

export const updateItem = (req, res) => {
    Item
        .findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch((err) => handleError(res, err));
};
