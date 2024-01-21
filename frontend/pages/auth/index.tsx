import cls from '../../components/pages/AuthPage/ui/AuthPage.module.scss'
import {Box, CircularProgress, Input, makeStyles, Tab, Tabs, Typography} from "@mui/material";
import {LoadingButton} from '@mui/lab';
import React, {ChangeEvent, useEffect, useState} from "react";
import ReactInputMask from 'react-input-mask';
import {useCookies} from "react-cookie";
import ErrorForm from "../../components/pages/AuthPage/additions/ErrorForm/ErrorForm";
import {classNames} from "../../components/shared/lib/classNames";
import PasswordInput from "../../components/pages/AuthPage/additions/PasswordInput/PasswordInput";
import {getData, postData} from "../../api/api";
import {useRouter} from "next/router";
import useCountdownTimer from "../../components/shared/hooks/useCountdownTimer";
import MyLoading from "../../components/shared/ui/MyLoading/MyLoading";
import {useSelector} from "react-redux";
import {getUserInfo} from "../../components/app/redux/slices/selectors/addUserInfoSelectors";
import useUserData from "../../components/shared/hooks/requestHooks/useUserData";

interface AuthPageProps {
    className?: string;
}

export type InputEvent = ChangeEvent<HTMLInputElement>;

function validateInput(inputValue: string) {
    const phoneNumberRegex = /^((\+?3)?8)?0\d{9}$/;
    if (phoneNumberRegex.test(inputValue)) {
        return true;
    } else {
        return false;
    }
}

const requestPath = {
    getOtp: '/front/auth/get-otp',
    checkOtp: '/front/auth/check-otp',
    getPhoneOtp: '/front/auth/get-otp-phone',
    checkPhoneOtp: '/front/auth/check-otp-phone'

}


const AuthPage = ({className}: AuthPageProps) => {
    useUserData()
    const userData = useSelector(getUserInfo)
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const [password, setPassword] = useState(['', '', '', '', '', '']);
    const [isValueConfirm, setIsValueConfirm] = useState(false)
    const [error429, setError429] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [authError, setAuthError] = useState({
        input: '',
        password: '',
    })
    const [timerForOneMin, startTimerForOneMin] = useCountdownTimer(59)
    const [timerForTenMin, startTimerForTenMin] = useCountdownTimer(599)

    console.log(userData)
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
        clearInputs()
        clearError()
    };

    useEffect(() => {
        startTimerForTenMin()
    }, [])


    const handleInputChange = (e: InputEvent) => {
        const {value, name} = e.target
        let cleaned = value
        if (name === 'phone') cleaned = value.replace(/[^0-9]/g, '');
        setInputValue(cleaned);
    };


    const handleBtnClick = async () => {
        console.log('handleBtnClick')

        console.log(inputValue)
        if (inputValue.length < 1) {
            return
        }

        if (!selectedTab) {
            setIsLoading(true)
            clearError()
            const res: any = await postData(requestPath.getOtp, {
                "email": inputValue
            })
            setIsLoading(false)

            if (res?.status === 204) {
                setIsValueConfirm(true)
                clearError()
                startTimerForOneMin()
            }

            console.log(res)
            if (res?.response?.status === 419) {
                const res = await getData("/sanctum/csrf-cookie")
                handleBtnClick()
                console.log(res)
                // setError429(true);
                // startTimerForTenMin();
            }


            if (res?.message) {
                setAuthError(prevState => ({
                    ...prevState,
                    input: res?.response?.data.message
                }))
            }
        } else {
            if (validateInput(inputValue)) {

                setIsLoading(true)
                clearError()
                const res: any = await postData(requestPath.getPhoneOtp, {
                    "phone": inputValue
                })
                setIsLoading(false)

                if (res?.status === 204) {
                    setIsValueConfirm(true)
                    clearError()
                    startTimerForOneMin()
                }


                if (res?.message) {
                    setAuthError(prevState => ({
                        ...prevState,
                        input: res?.response?.data.message
                    }))
                }
            } else {
                setAuthError(prevState => ({
                    ...prevState,
                    input: 'Невірний формат номеру'
                }))
            }
        }

    };

    const handleReturnBack = () => {
        setIsValueConfirm(false)
        clearError();
        clearInputs();
        setError429(false)
    }


    const handleSendOtpAgain = async () => {
        if (timerForOneMin === 0) handleBtnClick()
    }


    useEffect(() => {
        const otp = password.join('')
        console.log(otp)
        if (otp.length === 6) {
            checkOtp()
        }

        async function checkOtp() {
            if (!selectedTab) {
                console.log('checkOtp')
                const res: any = await postData(requestPath.checkOtp, {
                    "email": inputValue,
                    otp
                })

                if (res?.response?.status === 429) {
                    console.log('429')
                    setError429(true)
                    startTimerForTenMin()
                }

                if (res?.status === 204) {
                    clearError()
                    router.push('/account')
                    // clearInputs()
                }

                console.log(res)
                if (res.message) {
                    setAuthError(prevState => ({
                        ...prevState,
                        password: res.message
                    }))
                }
            } else {
                const res: any = await postData(requestPath.checkPhoneOtp, {
                    "phone": inputValue,
                    otp
                })

                if (res?.status === 204) {
                    clearError()
                    router.push('/account')
                    // clearInputs()
                }

                console.log(res)
                if (res.message) {
                    setAuthError(prevState => ({
                        ...prevState,
                        password: res.message
                    }))
                }
            }
        }


    }, [password])


    function clearError() {
        setAuthError({
            input: '',
            password: '',
        })

    }

    function clearInputs() {
        setInputValue('')
        setPassword(['', '', '', '', '', ''])
    }

    useEffect(() => {
        if (Boolean(userData.name)) router.push('/account')
    }, [userData])


    const handleEnterPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            console.log('Enter was pressed. Code executes here.');
            handleBtnClick();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEnterPress);

        return () => {
            window.removeEventListener('keydown', handleEnterPress);
        };
    }, [inputValue]);

    return (
        <Box className={classNames(cls.AuthPage, {}, [className])}>
            <Box>
                <img className={cls.image} alt='untk' src='/images/transactionScan.png'/>
            </Box>

            <Box className={cls.auth}>
                {!error429 ?
                    <Box className={cls.auth__content}>
                        <Box className={cls.auth__info}>
                            <Typography variant='h2'>Авторизація</Typography>

                            <Typography variant='body1'>Оберіть зручний спосіб
                                авторизації</Typography>

                            {isValueConfirm && <Typography variant='h3'>{inputValue}</Typography>}

                        </Box>

                        {!isValueConfirm ?
                            <Box className={classNames(cls.auth__navigations)}>

                                <Tabs sx={{paddingBottom: '30px'}} indicatorColor='primary' visibleScrollbar={true}
                                      value={selectedTab}
                                      onChange={handleTabChange} centered textColor="inherit">
                                    <Tab label="E-mail"/>
                                    <Tab label="Телефон"/>

                                </Tabs>

                                <Box sx={{paddingBottom: authError.input ? '18px' : '30px'}}>

                                    {selectedTab
                                        ?
                                        <ReactInputMask
                                            mask="+38(999)999-99-99"
                                            maskChar="_"
                                            name="phone"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                        >
                                            { /* @ts-ignore */}
                                            {() => (
                                                <Input
                                                    name="phone"
                                                    fullWidth={true}
                                                    disableUnderline={true}
                                                    sx={{borderColor: authError.input ? "#FF3E3E" : "#CED4DA"}}
                                                    placeholder="+38 (000) 000-00-00"
                                                />)}
                                        </ReactInputMask>
                                        :
                                        <Input
                                            value={inputValue}
                                            color='secondary'
                                            onChange={handleInputChange}
                                            fullWidth={true} name="email"
                                            disableUnderline={true}
                                            placeholder="Введіть e-mail"
                                            sx={{borderColor: authError.input ? "#FF3E3E" : "#CED4DA"}}
                                        />
                                    }

                                    {authError.input && <Typography display='inline-block' variant='h6' fontSize='10px'
                                                                    color='error'>{authError.input}</Typography>}

                                </Box>

                                <LoadingButton disabled={isLoading} loading={isLoading}
                                               onClick={handleBtnClick}
                                               variant={inputValue ? "contained" : "text"}
                                    // onKeyDown={(e) => handleKeyPress(e)}
                                               loadingIndicator={<MyLoading/>}>Війти</LoadingButton>

                            </Box>

                            :
                            <Box className={classNames(cls.auth__smsBlock)}>
                                <PasswordInput error={authError.password} password={password}
                                               setPassword={setPassword}/>
                                <Typography onClick={handleSendOtpAgain} variant='h4'>Надіслати ще
                                    раз {timerForOneMin !== 0 && `(${timerForOneMin} сек)`}</Typography>
                            </Box>

                        }

                    </Box>

                    : <ErrorForm handleReturnBack={handleReturnBack} timer={timerForTenMin}/>}

                {!error429 && isValueConfirm &&
                    <Typography onClick={handleReturnBack} variant='h4' fontWeight='700'>Повернутись до
                        входу</Typography>}
            </Box>

        </Box>
    );
};

export default AuthPage;
