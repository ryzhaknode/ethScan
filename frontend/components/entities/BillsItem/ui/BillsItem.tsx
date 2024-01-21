import cls from './BillsItem.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";
import Install from '../../../../public/images/icons/Install.svg'
import Link from "next/link";
import {StatusPaymentBlock} from "../../../shared/ui/StatusPaymentBlock/StatusPaymentBlock";
import {BillsItem as BillsItemType} from "../../../types/billsType";

interface BillsItemProps {
    className?: string;
    bills: BillsItemType;
    // base: string | undefined;
}

const BillsItem = ({className, bills}: BillsItemProps) => {


    console.log(bills?.state)
    // const thisFile = Object.values(bills?.files)[0]
    // const {original_url, name}= thisFile
    // завантаження файлу

    return (
        <Box className={classNames(cls.BillsItem, {}, [className])}>
            <Box className={cls.BillsItem__container1}>
                <Typography variant='h5'  className={cls.BillsItem__item}>{bills.number}</Typography>
                <Typography variant='h5'  className={cls.BillsItem__item}>{bills.created_at}</Typography>
                <Typography variant='h5'  className={cls.BillsItem__item}>{bills.fuelString}</Typography>
                <Typography variant='h5'  className={cls.BillsItem__item}>{bills.volume}</Typography>
                {/*<Typography variant='h5'  className={cls.BillsItem__item}>{bills.base}</Typography>*/}
                {/*<Typography variant='h5'  className={cls.BillsItem__item}>{bills.amount}</Typography>*/}
                {/*<Typography variant='h5'  className={cls.BillsItem__item}>{bills.amount}</Typography>*/}
            </Box>
            <Box className={cls.BillsItem__container2}>
                <Typography variant='h5'  className={cls.BillsItem__item}>{bills?.base}</Typography>
                <Typography variant='h5'  className={cls.BillsItem__item}>{bills.amount}</Typography>
                <Typography variant='h5'  className={cls.BillsItem__item}>{bills.amount}</Typography>
            </Box>
            <StatusPaymentBlock status={bills.state}/>
            <Link href={'/'} download={'/'} target="_blank" rel="noopener noreferrer" className={cls.BillsItem__img}>
                <Install/>
            </Link>
        </Box>
    );
};

export default BillsItem;