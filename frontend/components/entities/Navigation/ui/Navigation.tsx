import cls from './Navigation.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";
import {MyArrow} from "../../../shared/ui/Arrow/Arrow";

interface NavigationProps {
    className?: string;
    title?: string;
    total?: number;
    from?: number;
    to?: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Navigation = ({className, title, total, from, to, setPage}: NavigationProps) => {

    const nextPage = () => {
        if (to === total) return
        setPage(prev => prev + 1)
        console.log('next')
    }

    const prevPage = () => {
        if (from === 1) return
        setPage(prev => prev - 1)
        console.log('prev')
    }


    return (
        <Box className={classNames(cls.Navigation, {}, [className])}>
            <Typography
                className={cls.Navigation__text}
                variant='h2'
            >
                {title}
            </Typography>
            <Box className={cls.NavBlock}>
                <Typography className={cls.NavBlock__number}
                            variant='body1'>{`${from ?? 0}-${to ?? 0} з ${total ?? 0}`}</Typography>
                <Box className={cls.NavBlock__arrowBlock}>
                    <MyArrow onClick={prevPage} className={cls.NavBlock__arrowBlock__arr_left}
                             color={from === 1 ? "#DEE2E6" : "#141414"}></MyArrow>
                    <MyArrow onClick={nextPage} className={cls.NavBlock__arrowBlock__arr_right}
                             color={to === total ? "#DEE2E6" : "#141414"}></MyArrow>
                </Box>
            </Box>

        </Box>
    );
};

export default Navigation;