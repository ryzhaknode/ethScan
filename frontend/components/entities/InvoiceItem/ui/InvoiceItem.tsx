import cls from './InvoiceItem.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";
import Install from '../../../../public/images/icons/Install.svg'
import {InvoiceItem} from "../../../types/invoiceType";
import Link from "next/link";

interface InvoiceItemProps {
    className?: string;
    invoice: InvoiceItem
}

const InvoiceItem = ({className, invoice}: InvoiceItemProps) => {


    const thisFile = Object.values(invoice?.files)[0]
    // const {original_url, name}= thisFile
    // завантаження файлу

    return (
        <Box className={classNames(cls.InvoiceItem, {}, [className])}>
            <Box className={cls.InvoiceItem__container}>
                <Typography variant='h5'  className={cls.InvoiceItem__item}>{invoice.number}</Typography>
                <Typography variant='h5'  className={cls.InvoiceItem__item}>{invoice.created_at}</Typography>
                <Typography variant='h5'  className={cls.InvoiceItem__item}>{invoice.fuelString}</Typography>
                <Typography variant='h5'  className={cls.InvoiceItem__item}>{invoice.volume}</Typography>
                <Typography variant='h5'  className={cls.InvoiceItem__item}>{invoice.amount}</Typography>
            </Box>
            <Link href={'/'} download={'/'} target="_blank" rel="noopener noreferrer" className={cls.InvoiceItem__img}>
                <Install/>
            </Link>
        </Box>
    );
};

export default InvoiceItem;