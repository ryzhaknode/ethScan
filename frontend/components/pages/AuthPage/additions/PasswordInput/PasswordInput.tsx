import cls from './PasswordInput.module.scss'
import React, {useEffect, useRef} from "react";
import {Box, Input, Typography} from "@mui/material";
import {InputEvent} from "../../../../../pages/auth/index"
import {classNames} from "../../../../shared/lib/classNames";

interface PasswordInputProps {
    password: any;
    setPassword: any;
    error: any;
}

const PasswordInput = ({password, setPassword, error}: PasswordInputProps) => {

    console.log(password)

    const inputRefs = useRef(Array(6).fill(null).map(() => React.createRef()));


    useEffect(() => {
        const handlePaste = (event: any) => {
            // @ts-ignore
            const clipboardData = event.clipboardData || window.clipboardData;
            const pastedData = clipboardData.getData('Text');
            const digits = pastedData.match(/\d/g);
            console.log(pastedData)
            console.log(digits)

            if (digits && digits.length === 6) {
                console.log('yes')
                const newPassword = [...password];
                digits.forEach((digit: any, index: number) => {
                    newPassword[index] = digit;
                });
                setPassword(newPassword);
            }
        };

        window.addEventListener('paste', handlePaste);

        return () => {
            window.removeEventListener('paste', handlePaste);
        };
    }, [password]);


    const handlePasswordChange = (event: InputEvent, index: number) => {
        const {value} = event.target;
        const newPassword = [...password];
        newPassword[index] = value;
        setPassword(newPassword);
        if (index < 5 && value) {
            // @ts-ignore
            inputRefs.current[index + 1].current.focus();
        }
    };

    const handleBackspace = (event: any, index: any) => {
        if (event.keyCode === 8 && !password[index] && index > 0) {
            // @ts-ignore
            inputRefs.current[index - 1].current.focus();
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: error ? '36px' : '70px',
                alignItems: 'center'
            }}>
            <Box sx={{display: 'flex', textAlign: 'center', gap: '10px'}} className={classNames(cls.PasswordInput)}>
                {password.map((digit: any, index: number) => (
                    <Input
                        disableUnderline={true}
                        key={index}
                        sx={{
                            display: 'flex',
                            textAlign: 'center',
                            boxShadow: 'none',
                            maxWidth: '48px',
                            maxHeight: '48px',
                            border: '1px solid',
                            borderColor: error ? '#FF3E3E' : '#FFC404',
                        }}
                        type="text"
                        value={digit}
                        onChange={(event: any) => handlePasswordChange(event, index)}
                        onKeyDown={(event: any) => handleBackspace(event, index)}
                        inputProps={{
                            maxLength: 1, style: {
                                textAlign: 'center',
                                padding: '14px',
                            },
                        }}
                        inputRef={inputRefs.current[index]}
                    />
                ))}
            </Box>
            {error && <Typography display='inline-block' variant='h5' paddingTop='20px'
                                  color='error'>{error}</Typography>}
        </Box>
    );
};

export default PasswordInput;
