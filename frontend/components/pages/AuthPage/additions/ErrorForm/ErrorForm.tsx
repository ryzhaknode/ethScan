import cls from './ErrorForm.module.scss'
import {Box, Button, Typography} from "@mui/material";
import React from "react";

interface ErrorFormProps {
    timer: number;
    handleReturnBack: () => void
}

export const ErrorForm = ({timer, handleReturnBack}: ErrorFormProps) => {
    function secondsToTime(seconds:any) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }


    const returnBackToAuth = () => {
        if(timer === 0) handleReturnBack()
    }
    return (
        <Box className={cls.content}>
            <Box className={cls.info}>
                <Box className={cls.containerImage}>
                    <Box className={cls.containerImage__img}>
                        <img src='./images/thinking-face.svg' alt='error'/>
                    </Box>
                </Box>

                <Box className={cls.textBlock}>
                    <Typography textAlign='center' maxWidth='300px' variant='h2' color='error'>Багато спроб
                        введення
                        невірного паролю</Typography>

                    <Typography textAlign='center' maxWidth='300px' variant='body1'>Можливість авторизуватися
                        буде доступна не раніше ніж за
                        <Typography display='inline-block' variant='body1' color={timer === 0 ? 'main' : 'error'}>&nbsp; {`(${secondsToTime(timer)}
                            хв)`}</Typography>
                    </Typography>

                </Box>


            </Box>

            <Button onClick={returnBackToAuth} sx={{maxWidth: '240px'}} fullWidth={true}
                    variant={timer === 0 ? "contained" : "text"}>До авторизації</Button>

        </Box>
    );
};

export default ErrorForm;
