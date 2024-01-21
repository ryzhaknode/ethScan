import cls from './EditNavigationLayout.module.scss'
import {ReactNode} from "react";
import {Box, Typography} from "@mui/material";
import {classNames} from "../../../shared/lib/classNames";
import {MyArrow} from "../../../shared/ui/Arrow/Arrow";
import Delete from '../../../../public/images/icons/Delete.svg';
import {useRouter} from "next/router";
import StatusBlock from "../../../shared/ui/StatusBlock/StatusBlock";

interface EditNavigationLayoutProps {
    children: ReactNode;
    title?: string;
    routeBack: () => void;
    status: any;
    openPoppup: () => void;
}

const EditNavigationLayout = ({children, title, routeBack, status, openPoppup}: EditNavigationLayoutProps) => {
    const router = useRouter()
    return (
        <Box className={cls.EditNavigationLayout}>
            <Box className={classNames(cls.Navigation, {},)}>
                <Box display={'flex'} gap={'16px'}>

                    <Typography
                        className={cls.Navigation__text}
                        variant='h2'
                    >
                        {title}
                    </Typography>

                    <StatusBlock status={status} rightVariant={true}/>

                </Box>

                <Box className={cls.NavBlock}>
                    <Box onClick={routeBack} className={cls.NavBlock__box}>
                        <MyArrow className={cls.NavBlock__arr_left} color={"#141414"}></MyArrow>
                        <Typography className={cls.NavBlock__text}
                                    variant='body1'>Назад</Typography>
                    </Box>
                    <Box className={cls.NavBlock__box} onClick={openPoppup}>

                        <Delete color={"#141414"}></Delete>
                        <Typography className={cls.NavBlock__text}
                                    variant='body1' color={'error'}>Видалити</Typography>
                    </Box>
                </Box>
            </Box>
            {children}
        </Box>
    );
};

export default EditNavigationLayout;