import cls from './Popup.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {Box, Button, Typography} from "@mui/material";
import React, {ReactNode} from "react";
import Image from "next/image";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    imageDone?: boolean;
    children: ReactNode;
}

const Popup = ({isOpen, onClose, children, imageDone = false}: PopupProps) => {

    return (
        <>
            {isOpen && <Box className={classNames(cls.PopupOverlay, {})}>
                <Box className={cls.PopupOverlay__popup}>
                    <Box className={cls.PopupOverlay__popup__closeBtn} onClick={onClose}/>
                    <Box className={cls.PopupOverlay__popup__container}>
                        <Box className={cls.PopupOverlay__popup__img}>
                            <Image height={34} width={34}
                                   src={`${imageDone ? '/images/done.svg' : '/images/thinking-face.svg'}`}
                                   alt='image'
                            />
                        </Box>
                        <Box className={cls.PopupOverlay__popup__children}>
                            {children}
                        </Box>
                    </Box>
                </Box>
            </Box>
            }
        </>
    )
        ;
};

export default Popup;