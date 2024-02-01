import cls from './TransactionItem.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";
import Install from '../../../../public/images/icons/Install.svg'
import Link from "next/link";
import {AssetTransfersWithMetadataResult} from "alchemy-sdk";

interface TransactionItemProps {
    transaction: AssetTransfersWithMetadataResult;
}

const TransactionItem = ({transaction}: TransactionItemProps) => {

    const {blockNum} = transaction
    const blockNumDecimal = parseInt(blockNum, 16);

    console.log(blockNumDecimal)


    // const {rawContract} = transaction


    console.log(transaction)

    return (
        <Box className={classNames(cls.TransactionItem)}>
            <Box className={cls.TransactionItem__container}>
                {/*<Typography variant='h5'  className={cls.TransactionItem__item}>{transaction?.value}</Typography>*/}
                <Typography variant='h5'
                            className={cls.TransactionItem__item}>{transaction?.hash.slice(0, 10)}...</Typography>
                <Typography variant='h5'
                            className={cls.TransactionItem__item}>{transaction?.from.slice(0, 10)}...</Typography>
                <Typography variant='h5' className={cls.TransactionItem__item}>{transaction?.asset}</Typography>
                <Typography variant='h5'
                            className={cls.TransactionItem__item}>{Number.isInteger(transaction?.value) ? transaction?.value : transaction?.value?.toFixed(2)}</Typography>
                <Typography variant='h5'
                            className={cls.TransactionItem__item}>{transaction?.to?.slice(0, 10)}...</Typography>
            </Box>
            <Link href={'/'} download={'/'} target="_blank" rel="noopener noreferrer"
                  className={cls.TransactionItem__img}>
                <img src={'/images/icons/Install.svg'}/>
            </Link>
        </Box>
    );
};

export default TransactionItem;