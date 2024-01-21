import cls from './Trucktem.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import {useEffect, useState} from "react";
import {truckItem} from "../../../types/truckType";
import LdsSpinner from "../../../shared/ui/LdsSpinner/LdsSpinner";
import CloseIcon from "@mui/icons-material/Close";
import StatusBlock from "../../../shared/ui/StatusBlock/StatusBlock";
import {postData} from "../../../../api/api";
import {requestUrl} from "../../../pages/TruckPage/AddTruck/ui/AddTruck";
import {brandType} from "../../../types/brandType";

interface InvoiceItemProps {
    className?: string;
    truck: truckItem;
    routerPush: (id: number) => void;
    brand: string | undefined;
}

const Trucktem = ({className, truck, routerPush, brand}: InvoiceItemProps) => {
    const {number, id, model, length, height, weight, width, status} = truck

    return (
        <Box onClick={() => routerPush(id)} className={classNames(cls.TruckItem, {}, [className])}>
            <Box className={cls.TruckItem__container}>
                <Typography variant='h5' className={cls.TruckItem__item}>{number}</Typography>
                <Typography variant='h5' className={cls.TruckItem__item}>{brand}</Typography>
                <Typography variant='h5' className={cls.TruckItem__item}>{model}</Typography>
                <Typography variant='h5' className={cls.TruckItem__item}>{width} {length} {height}</Typography>
                <Typography variant='h5' className={cls.TruckItem__item}>{weight}</Typography>
            </Box>
            <StatusBlock status={status}/>
        </Box>
    );
};

export default Trucktem;