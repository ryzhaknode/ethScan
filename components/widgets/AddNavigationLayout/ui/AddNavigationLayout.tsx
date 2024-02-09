import cls from './AddNavigationLayout.module.scss'
import {ReactNode} from "react";
import {Box, Typography} from "@mui/material";
import {classNames} from "../../../shared/lib/classNames";
import {MyArrow} from "../../../shared/ui/Arrow/Arrow";

interface AddNavigationLayoutProps {
    children: ReactNode;
    title?: string;
    closePage: () => void;
}

const AddNavigationLayout = ({children, title, closePage}: AddNavigationLayoutProps) => {
    return (
        <Box className={cls.AddNavigationLayout}>
            <Box className={classNames(cls.Navigation, {}, )}>
                <Typography
                    className={cls.Navigation__text}
                    variant='h2'
                >
                    {title}
                </Typography>
                <Box onClick={closePage} className={cls.NavBlock}>
                    <MyArrow  className={cls.NavBlock__arr_left} color={"#141414"}/>
                    <Typography className={cls.NavBlock__text}
                                variant='body1' >Назад</Typography>
                </Box>
            </Box>
            {children}
        </Box>
    );
};

export default AddNavigationLayout;