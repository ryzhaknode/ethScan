import cls from './ScreenerTransactionItem.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";
import Link from "next/link";
import {transferType} from "../../../../pages/account/screener";

interface ScreenerTransactionItemProps {
    transaction: transferType;
    token: string;
}

const ScreenerTransactionItem = ({transaction, token}: ScreenerTransactionItemProps) => {


    return (
        <Box className={classNames(cls.ScreenerTransactionItem)}>
            <Box className={cls.ScreenerTransactionItem__container}>
                <Typography variant='h5' className={cls.ScreenerTransactionItem__item}>{transaction?.sender.slice(0, 10)}...</Typography>
                <Typography variant='h5' className={cls.ScreenerTransactionItem__item}>{transaction.amount}</Typography>
                <Typography variant='h5' className={cls.ScreenerTransactionItem__item}>{token}</Typography>
                <Typography variant='h5' className={cls.ScreenerTransactionItem__item}>{transaction?.recipient.slice(0, 10)}...</Typography>
                <Typography variant='h5' className={cls.ScreenerTransactionItem__item}>{transaction?.transactionHash.slice(0, 10)}...</Typography>
            </Box>
            <Link href={'/'} download={'/'} target="_blank" rel="noopener noreferrer"
                  className={cls.ScreenerTransactionItem__img}>
                <img src={'/images/icons/Install.svg'}/>
            </Link>
        </Box>
    );
};

export default ScreenerTransactionItem;