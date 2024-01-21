import cls from './DriverItem.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";
import {driverItem} from "../../../types/driverType";
import DoneIcon from '@mui/icons-material/Done';
import {useEffect, useState} from "react";
import LdsSpinner from "../../../shared/ui/LdsSpinner/LdsSpinner";
import CloseIcon from '@mui/icons-material/Close';
import StatusBlock from "../../../shared/ui/StatusBlock/StatusBlock";

interface InvoiceItemProps {
    className?: string;
    driver: driverItem;
    routerPush: (id: number) => void;
}

const DriverItem = ({className, driver, routerPush}: InvoiceItemProps) => {
    const {name, id, phone, driverLicense, passportNumber, passportDate, passportWhoGave, status} = driver;

    return (
        <Box onClick={() => routerPush(id)} className={classNames(cls.DriverItem, {}, [className])}>
            <Box className={cls.DriverItem__container}>
                <Typography variant='h5' className={cls.DriverItem__item}>{name}</Typography>
                <Typography variant='h5' className={cls.DriverItem__item}>{phone}</Typography>
                <Typography variant='h5' className={cls.DriverItem__item}>{driverLicense}</Typography>
                <Typography variant='h5' className={cls.DriverItem__item}>{passportNumber}</Typography>
                <Typography variant='h5' className={cls.DriverItem__item}>{passportDate}</Typography>
                <Typography variant='h5' className={cls.DriverItem__item}>{passportWhoGave}</Typography>
            </Box>

            <StatusBlock status={status}/>

        </Box>
    );
};

export default DriverItem;