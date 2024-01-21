import cls from './Trailertem.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import {useEffect, useState} from "react";
import {truckItem} from "../../../types/truckType";
import {trailerItem} from "../../../types/trailerType";
import LdsSpinner from "../../../shared/ui/LdsSpinner/LdsSpinner";
import CloseIcon from "@mui/icons-material/Close";
import StatusBlock from "../../../shared/ui/StatusBlock/StatusBlock";
import {postData} from "../../../../api/api";
import {requestUrl} from "../../../pages/TruckPage/AddTruck/ui/AddTruck";
import {brandType} from "../../../types/brandType";

interface TrailerItemProps {
    className?: string;
    trailer: trailerItem;
    routerPush: (id: number) => void;
    brand: string | undefined;
}

const Trailertem = ({className, trailer, routerPush, brand}: TrailerItemProps) => {
    const {number, status, model, length, width, height, weight, volume, sections, id} = trailer

    console.log(trailer)
    return (
        <Box onClick={() => routerPush(id)} className={classNames(cls.TrailerItem, {}, [className])}>
            <Box className={cls.TrailerItem__container}>
                <Typography variant='h5' className={cls.TrailerItem__item}>{number}</Typography>
                <Typography variant='h5' className={cls.TrailerItem__item}>{brand}</Typography>
                <Typography variant='h5' className={cls.TrailerItem__item}>{model}</Typography>
                <Typography variant='h5' className={cls.TrailerItem__item}>{width} {length} {height}</Typography>
                <Typography variant='h5' className={cls.TrailerItem__item}>{weight}</Typography>
                <Typography variant='h5' className={cls.TrailerItem__item}>{volume}</Typography>
                <Typography variant='h5' className={cls.TrailerItem__item}>{sections.length}</Typography>
                <Typography variant='h5' className={cls.TrailerItem__item}>{sections.length}</Typography>
            </Box>
            <StatusBlock status={status}/>
        </Box>
    );
};

export default Trailertem;