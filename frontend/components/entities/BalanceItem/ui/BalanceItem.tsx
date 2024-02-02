import cls from './BalanceItem.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";
import Install from '../../../../public/images/icons/Install.svg'
import Link from "next/link";
import {BalanceTokenType} from "../../../types/balanceTokenType";

interface BalanceItemProps {
    balanceToken: BalanceTokenType;
}

const BalanceItem = ({balanceToken}: BalanceItemProps) => {




    console.log(balanceToken)

    return (
        <Box className={classNames(cls.BalanceTokenItem)}>
            <Box className={cls.BalanceTokenItem__container}>
                <Typography variant='h5' className={cls.BalanceTokenItem__item}>{balanceToken?.name}</Typography>
                <Typography variant='h5' className={cls.BalanceTokenItem__item}>{balanceToken?.balance}</Typography>
                <Typography variant='h5' className={cls.BalanceTokenItem__item}>{balanceToken?.symbol}</Typography>


            </Box>
            <Link href={'/'} download={'/'} target="_blank" rel="noopener noreferrer"
                  className={cls.BalanceTokenItem__img}>
                <img src={'/images/icons/Install.svg'}/>
            </Link>
        </Box>
    );
};

export default BalanceItem;