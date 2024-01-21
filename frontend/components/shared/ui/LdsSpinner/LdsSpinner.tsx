import cls from './LdsSpinner.module.scss'
import {classNames} from "../../lib/classNames";
import {Box} from "@mui/material";

interface LdsSpinnerProps {
    className?: string;
}

const LdsSpinner = ({className}: LdsSpinnerProps) => {
    return (
        <Box className={classNames(cls.LdsSpinner, {}, [className])}>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
        </Box>
    );
};

export default LdsSpinner;