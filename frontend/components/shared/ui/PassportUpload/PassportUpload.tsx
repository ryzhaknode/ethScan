import React, {ReactNode, useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Install from '../../../../public/images/icons/Install.svg';
import Delete from '../../../../public/images/icons/Delete.svg';
import cls from  './PassportUpload.module.scss';

interface PassportUploadProps{
    text?: string;
    value: any;
    setValue: any;
}
const PassportUpload = (props:PassportUploadProps) => {
    const {text = 'Завантажити скан паспорту', value, setValue} = props
    const fileInputRef = useRef<any>(null);

    const handleBoxClick = () => {
        if (value) return;
        fileInputRef.current.click();
    };

    const handleFileChange = (event:any) => {
        console.log(event.target.files)
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setValue(selectedFile);
        }
    };

    const handleDeleteFile = () => {
        setValue(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

useEffect(()=>{
    console.log(value)
},[value])

    return (
        <>
            <Box className={cls.PassportUpload} onClick={handleBoxClick} style={{cursor: 'pointer'}}>
                {value ? (
                    <Box className={cls.PassportUpload__loaded}>
                        <Install />
                        <Typography  variant='body2'>{value.name.length < 20 ? value.name : `${value.name.slice(0, 20)}...` }</Typography>
                        <Delete onClick={handleDeleteFile} style={{cursor: 'pointer', paddingLeft: '5px'}}/>
                    </Box>
                ) : (
                    <Box className={cls.PassportUpload__empty}>
                        <Install />
                        <Typography variant='body2' fontWeight={'400'} fontSize={'14px'} color={'#6A7178'}>{text}</Typography>
                    </Box>
                )}
            </Box>
            <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </>
    );
};

export default PassportUpload;