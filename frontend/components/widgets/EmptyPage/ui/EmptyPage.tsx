import cls from './EmptyPage.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";

interface EmptyPageProps {
    className?: string;
}

const EmptyPage = ({className}: EmptyPageProps) => {
    return (
        <Box className={cls.EmptyPage}>
            <Box className={cls.EmptyPage__container}>
                <Box className={cls.EmptyPage__box}>
                    <img className={cls.EmptyPage__img} src='/images/Empty.png'/>
                    <Typography textAlign='center' maxWidth='280px' variant='body1' fontSize='22px'
                                lineHeight='26.4px'>Тут будуть відображатися
                        ваші витратні накладні</Typography>
                </Box>

            </Box>
        </Box>
    );
};

export default EmptyPage;