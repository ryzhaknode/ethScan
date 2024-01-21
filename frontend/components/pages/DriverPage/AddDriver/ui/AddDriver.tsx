import cls from './AddDriver.module.scss'
import {classNames} from "../../../../shared/lib/classNames";
import AddNavigationLayout from "../../../../widgets/AddNavigationLayout/ui/AddNavigationLayout";
import {Box, Button, Checkbox, FormLabel, Input, InputAdornment, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import CalendarImg from "../../../../../public/images/icons/Calendar.svg";
import ReactInputMask from "react-input-mask";
import ChooseDateCalendar from "../../../../entities/ChooseDateCalendar/ui/ChooseDateCalendar";
import PassportUpload from "../../../../shared/ui/PassportUpload/PassportUpload";
import Popup from "../../../../widgets/Popup/ui/Popup";
import {postData} from "../../../../../api/api";
import {convertDate} from "../../../../shared/function/formattedDateFunc";
import {useRouter} from "next/router";
import SuccessPopup from "../../../../widgets/SuccessPopup/SuccessPopup";
import MyLoading from "../../../../shared/ui/MyLoading/MyLoading";
import {LoadingButton} from "@mui/lab";

interface AddDriverProps {
    className?: string;
    closePage: () => void;
}

const requestUrl = {
    addDriver: '/front/driver/add-driver'
}


const AddDriver = ({className, closePage}: AddDriverProps) => {
    const router = useRouter()
    const {register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors, isValid}} = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });
    const birthday = watch("birthday");
    const passportTime = watch("passport_time")
    const foreignPassportTime = watch("foreignPassport_time")
    const drivingLicenseIssued = watch("drivingLicense_issued")
    const adrIssued= watch("adr_issued")
    const adrTime= watch("adr_time")
    const [passportFile1, setPassportFile1] = useState<any>("");
    const [passportFile2, setPassportFile2] = useState<any>("");
    const drivingLicenseTime= watch("drivingLicense_time")
    const [birthdayCalendar, setBirthdayCalendar] = useState(false);
    const [passportCalendar, setPassportCalendar] = useState(false);
    const [foreignPassportCalendar, setForeignPassportCalendar] = useState(false);
    const [drivingLicenseIssuedCalendar, setDrivingLicenseIssuedCalendar] = useState(false);
    const [drivingLicenseTimeCalendar, setDrivingLicenseTimeCalendar] = useState(false);
    const [adrIssuedCalendar, setAdrIssuedCalendar] = useState(false);
    const [adrTimeCalendar, setAdrTimeCalendar] = useState(false);
    const [idCardCheck, setIdCardCheck] = useState(false)
    const [isPopupStopAddOpen, setIsPopupStopAddOpen] = useState(false);
    const [isPopupSuccessAddOpen, setIsPopupSuccessAddOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [btnFetchLoader, setBtnFetchLoader ] = useState(false)

    useEffect(()=>{
        console.log(passportFile1)
        console.log(passportFile2)
    },[passportFile1, passportFile2])
    const drivingLicenseIssuedCalendarMethods = {
        handleCalendarClose() {
            setDrivingLicenseIssuedCalendar(false)
        },
        handleCalendarClick() {
            setDrivingLicenseIssuedCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("drivingLicense_issued", selectedTime, { shouldValidate: true })
        },
        handleClearCalendarValue() {
            setValue("drivingLicense_issued", "")
        }
    }
    const drivingLicenseTimeCalendarMethods = {
        handleCalendarClose() {
            setDrivingLicenseTimeCalendar(false)
        },
        handleCalendarClick() {
            setDrivingLicenseTimeCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("drivingLicense_time", selectedTime, { shouldValidate: true })
        },
        handleClearCalendarValue() {
            setValue("drivingLicense_time", "", )
        }
    }
    const adrIssuedCalendarMethods = {
        handleCalendarClose() {
            setAdrIssuedCalendar(false)
        },
        handleCalendarClick() {
            setAdrIssuedCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("adr_issued", selectedTime, { shouldValidate: true })
        },
        handleClearCalendarValue() {
            setValue("adr_issued", "")
        }
    }
    const adrTimeCalendarMethods = {
        handleCalendarClose() {
            setAdrTimeCalendar(false)
        },
        handleCalendarClick() {
            setAdrTimeCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("adr_time", selectedTime, { shouldValidate: true })
        },
        handleClearCalendarValue() {
            setValue("adr_time", "")
        }
    }
    const birthdayCalendarMethods = {
        handleCalendarClose() {
            setBirthdayCalendar(false)
        },
        handleCalendarClick() {
            setBirthdayCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("birthday", selectedTime, { shouldValidate: true })
        },
        handleClearCalendarValue() {
            setValue("birthday", "")
        }
    }
    const passportCalendarMethods = {
        handleCalendarClose() {
            setPassportCalendar(false)
        },
        handleCalendarClick() {
            setPassportCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("passport_time", selectedTime, { shouldValidate: true })
        },
        handleClearCalendarValue() {
            setValue("passport_time", "")
        }
    }
    const foreignPassportCalendarMethods = {
        handleCalendarClose() {
            setForeignPassportCalendar(false)
        },
        handleCalendarClick() {
            setForeignPassportCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("foreignPassport_time", selectedTime, { shouldValidate: true })
        },
        handleClearCalendarValue() {
            setValue("foreignPassport_time", "")
        }
    }
    const popupStopMethods = {
        openPopup() {
            setIsPopupStopAddOpen(true);
        },
        closePopup() {
            setIsPopupStopAddOpen(false);
        },
        confirmAction() {
            popupStopMethods.closePopup();
            closePage();
        }
    }
    const popupSuccessMethods = {
        openPopup() {
            setIsPopupSuccessAddOpen(true);
        },
        closePopup() {
            closePage()
            setIsPopupSuccessAddOpen(false);
        },
        confirmAction() {
            popupSuccessMethods.closePopup();
        }
    }

    useEffect(()=>{
        console.log(register)
    },[register])

    function fillFormData(data: any) {
        const formData = new FormData();
        const idCard = idCardCheck ? '1' : '0'

        console.log(`${data?.drivingLicense_series}${data?.drivingLicense_number}`)
        formData.append('firstName', data?.firstName);
        formData.append('lastName', data?.lastName);
        formData.append('middleName', data?.middleName);
        formData.append('phone', data?.phone);
        formData.append('driverLicense', data?.drivingLicense_number);
        formData.append('licDateStart', convertDate(data?.drivingLicense_issued));
        formData.append('licDateStop', convertDate(data?.drivingLicense_time));
        formData.append('idCard', idCard);
        formData.append('passportSeries', data?.passport_series);
        formData.append('passportNumber', data?.passport_number);
        formData.append('passportDate', convertDate(data?.passport_time));
        formData.append('passportWhoGave', data?.passport_issued);
        formData.append('address', data?.address);
        formData.append('adrNumber', data?.adr_number);
        formData.append('dateAdrStart', convertDate(data?.adr_issued));
        formData.append('dateAdrStop', convertDate(data?.adr_time));

        formData.append('bDate',  convertDate(data?.birthday));
        formData.append('passportInt', data?.foreignPassport_number);
        formData.append('passDate', convertDate(data?.passport_time));
        formData.append('ipn', data?.ipn);
        // file
        console.log(passportFile1)
        console.log(passportFile2)
        formData.append('passportScan', passportFile1);
        formData.append('intPassportScan',  passportFile2);

        return formData
    }

    const onSubmit = async (data: any) => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);

        const formData: any = fillFormData(data)

        // console.log(formData)
        async function addDriver() {
            setBtnFetchLoader(true)
            const responce = await postData(requestUrl.addDriver, formData, true)

            console.log(responce)

            if(responce.status === 204){
                setIsPopupSuccessAddOpen(true)
            }
            setIsSubmitting(false);
            setBtnFetchLoader(false)

        }

        addDriver()
        console.log(data);
    };



    return (
        <AddNavigationLayout title={'НОВИЙ ВОДІЙ'} closePage={popupStopMethods.openPopup}>
            <Box className={classNames(cls.AddDriver, {}, [className])}>
                <Box className={cls.AddDriver__container}>
                    <form className={cls.Form} onSubmit={handleSubmit(onSubmit)}>
                        {/*Прізвіще Імя По батькові...*/}
                        <Box className={cls.Form__SixForm}>
                            {/*Прізвіще Імя По батькові*/}
                            <Box flexWrap={'wrap'} className={cls.Form__block}>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="lastName">Прізвище*</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        style={{border: errors.lastName && '1px solid red'}}
                                        {...register("lastName", {required: "Це поле є обовязковим"})} />
                                    {/*@ts-ignore*/}
                                    {errors?.lastName && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.lastName?.message}</Typography>}

                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="firstName">Імя*</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        style={{border: errors.firstName && '1px solid red'}}
                                        {...register("firstName", {required: "Це поле є обовязковим"})} />
                                    {/*@ts-ignore*/}
                                    {errors?.firstName && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.firstName?.message}</Typography>}
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="middleName">По батькові*</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        style={{border: errors.middleName && '1px solid red'}}
                                        {...register("middleName", {required: "Це поле є обовязковим"})} />
                                    {/*@ts-ignore*/}
                                    {errors.middleName && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.middleName.message}</Typography>}
                                </Box>
                            </Box>
                            <Box flexWrap={'wrap'} className={cls.Form__block}>
                                <Box className={classNames(cls.Form__group, {}, [cls.Form__calendar])}>
                                    <FormLabel htmlFor="birthday">Дата народження</FormLabel>
                                    <Input
                                        onClick={birthdayCalendarMethods.handleCalendarClick}
                                        // value={calendarValue}
                                        disableUnderline={true} placeholder='00.00.0000'
                                        //@ts-ignore
                                        // style={{border: !birthday && errors?.birthday && '1px solid red'}}
                                        {...register("birthday",
                                            // {required: "Це поле є обовязковим"}
                                        )}
                                        className={classNames(cls.searchBlock__calendarBlock__calendar,
                                            {open_inputCalendar: birthdayCalendar}
                                        )
                                        }
                                        endAdornment={
                                            <InputAdornment sx={{padding: '12px'}} position="end">
                                                <CalendarImg/>
                                            </InputAdornment>

                                        }/>
                                    {/*@ts-ignore*/}
                                    {/*{!birthday && errors.birthday && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.birthday.message}</Typography>}*/}

                                    <ChooseDateCalendar clearTime={birthdayCalendarMethods.handleClearCalendarValue}
                                                        setTime={birthdayCalendarMethods.handleSetCalendarValue}
                                                        isOpen={birthdayCalendar}
                                                        closeCalendar={birthdayCalendarMethods.handleCalendarClose}
                                    />
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="firstName">Телефон*</FormLabel>
                                    <ReactInputMask
                                        mask="380999999999"
                                        {...register("phone", {required: "Це поле є обовязковим"})}
                                        maskChar="_"
                                        name="phone"
                                    >
                                        { /* @ts-ignore */}
                                        {() => (
                                            <Input
                                                name="phone"
                                                style={{border: errors.phone && '1px solid red'}}
                                                disableUnderline={true}
                                                // sx={{borderColor: authError.input ? "#FF3E3E" : "#CED4DA"}}
                                                placeholder="+380"
                                            />)}
                                    </ReactInputMask>
                                    {/*@ts-ignore*/}
                                    {errors.phone && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.phone.message}</Typography>}

                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="ipn">ІПН</FormLabel>
                                    <Input disableUnderline={true}
                                           // style={{border: errors.ipn && '1px solid red'}}
                                           {...register("ipn", {
                                               // required: "Це поле є обовязковим",
                                               pattern: {
                                                   value: /^[0-9]*$/,
                                                   message: "Тільки цифри дозволені"
                                               }})} />
                                    {/*@ts-ignore*/}
                                    {/*{errors.ipn && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.ipn.message}</Typography>}*/}
                                </Box>
                            </Box>

                        </Box>
                        {/*Паспорт*/}
                        <Box className={cls.Form__Passport}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Державний
                                паспорт</Typography>
                            <Box className={cls.Form__Passport__id}>
                                <Checkbox
                                    checked={idCardCheck}
                                    onChange={() => setIdCardCheck(prevState => !prevState)}
                                    size={'medium'}
                                    sx={{
                                        color: '#CED4DA',
                                        '&.Mui-checked': {
                                            color: '#FFC404',
                                        },
                                    }}/>
                                <Typography variant='h5' fontSize={'14px'} color={'#ADB5BD'}>
                                    <Typography variant='h5' fontSize={'14px'} display={'inline'} paddingRight={'5px'}
                                                color={'#141414'}>ID карта</Typography>
                                    { !idCardCheck && '(паспорт)'}
                                </Typography>

                            </Box>

                            <Box className={cls.Form__Passport__info}>
                                <Box display={'flex'} gap={"8px"} flexWrap={'wrap'}>
                                    <Box
                                        className={classNames(cls.Form__Passport__info__block, {displayNone: idCardCheck})}
                                        width={'72px'}>
                                        <FormLabel htmlFor="passport_series">Серія*</FormLabel>
                                        <Input
                                            style={{border: errors.passport_series && '1px solid red'}}
                                            disableUnderline={true}
                                            {...register("passport_series", {required: idCardCheck ? false : "Це поле є обовязковим"})} />
                                        {/*@ts-ignore*/}
                                        {errors.passport_series && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.passport_series.message}</Typography>}

                                    </Box>
                                    <Box className={cls.Form__Passport__info__block}
                                         width={idCardCheck ? '240px' : '160px'}>
                                        <FormLabel htmlFor="passport_number">Номер*</FormLabel>
                                        <Input
                                            disableUnderline={true}
                                            style={{border: errors.passport_number && '1px solid red'}}
                                            {...register("passport_number", {required: "Це поле є обовязковим",
                                                pattern: {
                                                    value: /^[0-9]*$/,
                                                    message: "Тільки цифри дозволені"
                                                }})} />
                                        {/*@ts-ignore*/}
                                        {errors.passport_number && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.passport_number.message}</Typography>}
                                    </Box>
                                    <Box className={classNames(cls.Form__group, {}, [cls.Form__calendar])}
                                         width={'240px'}>
                                        <FormLabel htmlFor="passport_time">Виданий*</FormLabel>
                                        <Input
                                            onClick={passportCalendarMethods.handleCalendarClick}
                                            disableUnderline={true} placeholder='00.00.0000'
                                            style={{border: `${!passportTime && errors.passport_time ? '1px solid red' : ""}`}}
                                            {...register("passport_time", {required: "Це поле є обовязковим"})}
                                            className={classNames(cls.searchBlock__calendarBlock__calendar,
                                                {open_inputCalendar: passportCalendar}
                                            )
                                            }
                                            endAdornment={
                                                <InputAdornment sx={{padding: '12px'}} position="end">
                                                    <CalendarImg/>
                                                </InputAdornment>

                                            }/>
                                        {/*@ts-ignore*/}
                                        {!passportTime && errors.passport_time && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.passport_time.message}</Typography>}

                                        <ChooseDateCalendar clearTime={passportCalendarMethods.handleClearCalendarValue}
                                                            setTime={passportCalendarMethods.handleSetCalendarValue}
                                                            isOpen={passportCalendar}
                                                            closeCalendar={passportCalendarMethods.handleCalendarClose}
                                        />
                                    </Box>
                                </Box>
                                <Box className={cls.Form__Passport__info__block} width={'492px'}>
                                    <FormLabel htmlFor="passport_issued">Ким виданий*</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        style={{border: errors.passport_issued && '1px solid red'}}
                                        {...register("passport_issued", {required: "Це поле є обовязковим"})} />
                                    {/*@ts-ignore*/}
                                    { errors.passport_issued && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.passport_issued.message}</Typography>}

                                </Box>
                            </Box>

                        </Box>
                        {/*Адреса прописки*/}
                        <Box className={cls.Form__Adress}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Адреса
                                прописки</Typography>
                            <Box className={cls.Form__Adress__info__block} width={'492px'}>
                                <Input
                                    disableUnderline={true}
                                    // style={{border: errors.address && '1px solid red'}}
                                    {...register("address",
                                        // {required: "Це поле є обовязковим"}
                                    )} />
                                {/*@ts-ignore*/}
                                {/*{errors.address && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.address.message}</Typography>}*/}

                            </Box>

                            <PassportUpload  value={passportFile1}  setValue={setPassportFile1}/>
                        </Box>

                        {/*Закордонний паспорт*/}
                        <Box className={cls.Form__ForeignPassport}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Закордонний
                                паспорт</Typography>
                            <Box display={'flex'} gap={"8px"} flexWrap={'wrap'}>
                                <Box className={cls.Form__ForeignPassport__block} width={'240px'}>
                                    <FormLabel htmlFor="foreignPassport_number">Номер</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        // style={{border: errors.foreignPassport_number && '1px solid red'}}
                                        {...register("foreignPassport_number",
                                            {
                                                // required: "Це поле є обовязковим",
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: "Тільки цифри дозволені"
                                            }})} />
                                    {/*@ts-ignore*/}
                                    {/*{errors.foreignPassport_number && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.foreignPassport_number.message}</Typography>}*/}
                                </Box>
                                <Box className={classNames(cls.Form__ForeignPassport__block, {}, [cls.Form__calendar])}
                                     width={'240px'}>
                                    <FormLabel htmlFor="foreignPassport_time">Дійсний до</FormLabel>
                                    <Input
                                        onClick={foreignPassportCalendarMethods.handleCalendarClick}
                                        disableUnderline={true} placeholder='00.00.0000'
                                        // style={{border: `${!foreignPassportTime && errors.foreignPassport_time ? '1px solid red': ""}`}}
                                        {...register("foreignPassport_time",
                                            // {required: "Це поле є обовязковим"}
                                        )}
                                        className={classNames(cls.searchBlock__calendarBlock__calendar,
                                            {open_inputCalendar: foreignPassportCalendar}
                                        )
                                        }
                                        endAdornment={
                                            <InputAdornment sx={{padding: '12px'}} position="end">
                                                <CalendarImg/>
                                            </InputAdornment>

                                        }/>
                                    {/*@ts-ignore*/}
                                    {/*{!foreignPassportTime && errors.foreignPassport_time && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.foreignPassport_time.message}</Typography>}*/}

                                    <ChooseDateCalendar
                                        clearTime={foreignPassportCalendarMethods.handleClearCalendarValue}
                                        setTime={foreignPassportCalendarMethods.handleSetCalendarValue}
                                        isOpen={foreignPassportCalendar}
                                        closeCalendar={foreignPassportCalendarMethods.handleCalendarClose}
                                        checkMinDate={true}
                                    />
                                </Box>
                            </Box>

                            <PassportUpload value={passportFile2}  setValue={setPassportFile2}/>
                        </Box>

                        {/*Посвідчення водія*/}

                        <Box className={cls.Form__DrivingLicense}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Посвідчення
                                водія</Typography>
                            <Box className={cls.Form__DrivingLicense__block} width={'240px'}>
                                <FormLabel htmlFor="drivingLicense_number">Номер</FormLabel>
                                <Input
                                    disableUnderline={true}
                                    style={{border: errors.drivingLicense_number && '1px solid red'}}
                                    {...register("drivingLicense_number", {required: "Це поле є обовязковим",
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Тільки цифри дозволені"
                                        }})} />
                                {/*@ts-ignore*/}
                                {errors.drivingLicense_number && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.drivingLicense_number.message}</Typography>}
                            </Box>

                            <Box display={'flex'} gap={"8px"} flexWrap={'wrap'}>
                                <Box className={classNames(cls.Form__DrivingLicense__block, {}, [cls.Form__calendar])}
                                     width={'240px'}>
                                    <FormLabel htmlFor="drivingLicense_issued">Виданий</FormLabel>
                                    <Input
                                        onClick={drivingLicenseIssuedCalendarMethods.handleCalendarClick}
                                        disableUnderline={true} placeholder='00.00.0000'
                                        style={{border: `${!drivingLicenseIssued && errors.drivingLicense_issued ? '1px solid red' : ""}`}}
                                        {...register("drivingLicense_issued", {required: "Це поле є обовязковим"})}
                                        className={classNames(cls.searchBlock__calendarBlock__calendar,
                                            {open_inputCalendar: drivingLicenseIssuedCalendar}
                                        )
                                        }
                                        endAdornment={
                                            <InputAdornment sx={{padding: '12px'}} position="end">
                                                <CalendarImg/>
                                            </InputAdornment>

                                        }/>
                                    {/*@ts-ignore*/}
                                    {!drivingLicenseIssued && errors.drivingLicense_issued && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.drivingLicense_issued.message}</Typography>}

                                    <ChooseDateCalendar
                                        clearTime={drivingLicenseIssuedCalendarMethods.handleClearCalendarValue}
                                        setTime={drivingLicenseIssuedCalendarMethods.handleSetCalendarValue}
                                        isOpen={drivingLicenseIssuedCalendar} position={true}
                                        closeCalendar={drivingLicenseIssuedCalendarMethods.handleCalendarClose}
                                    />
                                </Box>
                                <Box className={classNames(cls.Form__DrivingLicense__block, {}, [cls.Form__calendar])}
                                     width={'240px'}>
                                    <FormLabel htmlFor="drivingLicense_time">Дійсний до</FormLabel>
                                    <Input
                                        onClick={drivingLicenseTimeCalendarMethods.handleCalendarClick}
                                        disableUnderline={true} placeholder='00.00.0000'
                                        style={{border: `${!drivingLicenseTime &&  errors.drivingLicense_time ? '1px solid red' : ""}`}}
                                        {...register("drivingLicense_time", {required: "Це поле є обовязковим"})}
                                        className={classNames(cls.searchBlock__calendarBlock__calendar,
                                            {open_inputCalendar: drivingLicenseTimeCalendar}
                                        )
                                        }
                                        endAdornment={
                                            <InputAdornment sx={{padding: '12px'}} position="end">
                                                <CalendarImg/>
                                            </InputAdornment>

                                        }/>
                                    {/*@ts-ignore*/}
                                    {!drivingLicenseTime && errors.drivingLicense_time && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.drivingLicense_time.message}</Typography>}

                                    <ChooseDateCalendar
                                        clearTime={drivingLicenseTimeCalendarMethods.handleClearCalendarValue}
                                        setTime={drivingLicenseTimeCalendarMethods.handleSetCalendarValue}
                                        isOpen={drivingLicenseTimeCalendar} position={true}
                                        closeCalendar={drivingLicenseTimeCalendarMethods.handleCalendarClose}
                                        checkMinDate={true}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/*ADR водія*/}
                        <Box display={'flex'} justifyContent={"space-between"} flexWrap={'wrap'} gap={'14px'}>
                            <Box className={cls.Form__ADR}>
                                <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>ADR водія</Typography>
                                <Box className={cls.Form__ADR__block} width={'240px'}>
                                    <FormLabel htmlFor="adr_number">Номер</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        // style={{border: errors.adr_number && '1px solid red'}}
                                        {...register("adr_number",
                                            {
                                                // required: "Це поле є обовязковим",
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: "Тільки цифри дозволені"
                                            }})} />
                                    {/*@ts-ignore*/}
                                    {/*{ errors.adr_number && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.adr_number.message}</Typography>}*/}
                                </Box>

                                <Box display={'flex'} gap={"8px"} flexWrap={'wrap'}>
                                    <Box className={classNames(cls.Form__ADR__block, {}, [cls.Form__calendar])}
                                         width={'240px'}>
                                        <FormLabel htmlFor="adr_issued">Виданий</FormLabel>
                                        <Input
                                            onClick={adrIssuedCalendarMethods.handleCalendarClick}
                                            disableUnderline={true} placeholder='00.00.0000'
                                            // style={{border: `${!adrIssued && errors.adr_issued ? '1px solid red' : ""}`}}
                                            {...register("adr_issued",
                                                // {required: "Це поле є обовязковим"}
                                            )}
                                            className={classNames(cls.searchBlock__calendarBlock__calendar,
                                                {open_inputCalendar: adrIssuedCalendar}
                                            )
                                            }
                                            endAdornment={
                                                <InputAdornment sx={{padding: '12px'}} position="end">
                                                    <CalendarImg/>
                                                </InputAdornment>

                                            }/>
                                        {/*@ts-ignore*/}
                                        {/*{!adrIssued && errors.adr_issued && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.adr_issued.message}</Typography>}*/}

                                        <ChooseDateCalendar
                                            clearTime={adrIssuedCalendarMethods.handleClearCalendarValue}
                                            setTime={adrIssuedCalendarMethods.handleSetCalendarValue}
                                            isOpen={adrIssuedCalendar} position={true}
                                            closeCalendar={adrIssuedCalendarMethods.handleCalendarClose}
                                        />
                                    </Box>
                                    <Box className={classNames(cls.Form__ADR__block, {}, [cls.Form__calendar])}
                                         width={'240px'}>
                                        <FormLabel htmlFor="adr_time">Дійсний до</FormLabel>
                                        <Input
                                            onClick={adrTimeCalendarMethods.handleCalendarClick}
                                            disableUnderline={true} placeholder='00.00.0000'
                                            // style={{border: `${!adrTime && errors.adr_time ? '1px solid red' : ""}`}}
                                            {...register("adr_time",
                                                // {required: "Це поле є обовязковим"}
                                            )}
                                            className={classNames(cls.searchBlock__calendarBlock__calendar,
                                                {open_inputCalendar: adrTimeCalendar}
                                            )
                                            }
                                            endAdornment={
                                                <InputAdornment sx={{padding: '12px'}} position="end">
                                                    <CalendarImg/>
                                                </InputAdornment>

                                            }/>
                                        {/*@ts-ignore*/}
                                        {/*{!adrTime && errors.adr_time && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors.adr_time.message}</Typography>}*/}

                                        <ChooseDateCalendar clearTime={adrTimeCalendarMethods.handleClearCalendarValue}
                                                            setTime={adrTimeCalendarMethods.handleSetCalendarValue}
                                                            isOpen={adrTimeCalendar}
                                                            position={true}
                                                            closeCalendar={adrTimeCalendarMethods.handleCalendarClose}
                                                            checkMinDate={true}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <LoadingButton className={cls.Form__submitButton}  disabled={btnFetchLoader} loading={btnFetchLoader}
                                           type='submit'
                                           fullWidth={true}
                                           variant={'contained'}
                                           loadingIndicator={<MyLoading/>}>Додати</LoadingButton>
                        </Box>
                    </form>
                </Box>
            </Box>
            <Popup isOpen={isPopupStopAddOpen} onClose={popupStopMethods.closePopup}>
                <Typography textAlign={'center'} paddingBottom={'30px'} variant={'h2'}>Ви дійсно бажаєте припинити
                    додавання авто?</Typography>
                {/*<Typography variant={'h2'} fontWeight={'400'}>AN1234DF</Typography>*/}
                <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'} gap={'20px'}>
                    <Button sx={{width: '160px'}} variant={'outlined'}
                            onClick={popupStopMethods.confirmAction}>Вийти</Button>
                    <Button sx={{width: '160px'}} variant={'contained'}
                            onClick={popupStopMethods.closePopup}>Продовжити</Button>
                </Box>
            </Popup>

            <Popup imageDone={true} isOpen={isPopupSuccessAddOpen} onClose={popupSuccessMethods.closePopup}>
                <Typography textAlign={'center'} variant={'h2'} paddingBottom={'16px'}>Водія успішно додано!</Typography>
                <Typography textAlign={'center'} maxWidth={'350px'} variant={'body1'} paddingBottom={'30px'}>Дані про
                    авто водія  в статусі <br/><Typography variant={'body1'} display={'inline'} fontWeight={'500'}>“очікує
                        підтвердження”</Typography>, після перевірки заявки, статус водія  зміниться</Typography>
                <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'} gap={'20px'}>
                    <Button sx={{width: '240px'}} variant={'contained'}
                            onClick={popupSuccessMethods.closePopup}>OK</Button>
                </Box>
            </Popup>
        </AddNavigationLayout>
    );
};

export default AddDriver;