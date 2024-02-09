import cls from './SuccessPopup.module.scss'
import React, {ReactNode, useEffect} from "react";
import {Box, Typography} from "@mui/material";
import {classNames} from "../../shared/lib/classNames";
import Image from "next/image";

interface SuccessPopupProps {
    className?: string;
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const SuccessPopup = ({className, show, onClose, children}: SuccessPopupProps) => {
    useEffect(() => {
        if (show) {
            console.log('closeDeletePopup')
            const timer = setTimeout(() => {
                console.log('done')
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <Box className={classNames(cls.SuccessPopup)}>
            <Box className={cls.SuccessPopup__content} >
                <Box className={cls.SuccessPopup__content__imageBlock}>
                    <Image height={20} width={20}
                           src={'/images/done.svg'}
                           alt='image'
                    />
                </Box>
                <Typography variant={'h3'} fontWeight={'700'} lineHeight={'17.6px'} color={'#00D689'}>{children}</Typography>
            </Box>
        </Box>
    );
};

export default SuccessPopup;