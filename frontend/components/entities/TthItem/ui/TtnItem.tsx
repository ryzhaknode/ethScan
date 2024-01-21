import cls from './TthItem.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";
import Install from '../../../../public/images/icons/Install.svg'
import {TtnItem} from "../../../types/TtnType";
import Link from "next/link";

interface TthItemProps {
    className?: string;
    tth: TtnItem

}

const TtnItem = ({className, tth}: TthItemProps) => {
    const thisFile = Object.values(tth?.files)[0]

    const { original_url = null, name = null } = thisFile || {};

    return (
        <Box className={classNames(cls.TthItem, {}, [className])}>
            <Box className={cls.TthItem__container}>
                <Typography variant='h5'  className={cls.TthItem__item}>{tth.number}</Typography>
                <Typography variant='h5'  className={cls.TthItem__item}>{tth.created_at}</Typography>
                <Typography variant='h5'  className={cls.TthItem__item}>{tth.fuelString}</Typography>
                <Typography variant='h5'  className={cls.TthItem__item}>{tth.volume}</Typography>
                <Typography variant='h5'  className={cls.TthItem__item}>{tth.truckNumber}</Typography>
                <Typography variant='h5'  className={cls.TthItem__item}>{tth.trailerNumber}</Typography>
                <Typography variant='h5'  className={cls.TthItem__item}>{tth.driverFullName}</Typography>
            </Box>
            <Link href={original_url || '/default-url'} download={name} target="_blank" rel="noopener noreferrer" className={cls.TthItem__img}>
                <Install />
            </Link>
        </Box>
    );
};

export default TtnItem;