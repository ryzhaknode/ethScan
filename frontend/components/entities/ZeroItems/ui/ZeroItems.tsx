import cls from './ZeroItems.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Typography} from "@mui/material";

interface ZeroItemsProps {
    className?: string;
}

const ZeroItems = ({className}: ZeroItemsProps) => {
    return (
        <Box className={classNames(cls.ZeroItems, {}, [className])}>
            <Box className={cls.ZeroItems__box}>
                <img className={cls.ZeroItems__img} src='/images/ZeroItems.png'/>
                <Typography textAlign='center' maxWidth='300px' variant='body1' fontSize='22px'
                            lineHeight='26.4px'>Empty :(</Typography>
            </Box>
        </Box>
    );
};

export default ZeroItems;