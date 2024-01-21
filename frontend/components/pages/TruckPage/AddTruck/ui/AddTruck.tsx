import cls from './AddTruck.module.scss'
import {classNames} from "../../../../shared/lib/classNames";
import AddNavigationLayout from "../../../../widgets/AddNavigationLayout/ui/AddNavigationLayout";
import {Box, Button, FormLabel, Input, InputAdornment, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import React, {useEffect, useRef, useState} from "react";
import CalendarImg from "../../../../../public/images/icons/Calendar.svg";
import ChooseDateCalendar from "../../../../entities/ChooseDateCalendar/ui/ChooseDateCalendar";
import PassportUpload from "../../../../shared/ui/PassportUpload/PassportUpload";
import Popup from "../../../../widgets/Popup/ui/Popup";
import {convertDate} from "../../../../shared/function/formattedDateFunc";
import {postData} from "../../../../../api/api";
import {MyArrow} from "../../../../shared/ui/Arrow/Arrow";
import {sectionTab} from "../../../TrailerPage/AddTrailer/ui/AddTrailer";
import MyLoading from "../../../../shared/ui/MyLoading/MyLoading";
import {LoadingButton} from "@mui/lab";

interface AddTruckProps {
    className?: string;
    closePage: () => void;
}


export const requestUrl = {
    addTruck: '/front/vehicle/add-truck',
    getBrand: '/front/vehicle/brands'
}
const AddTruck = ({className, closePage}: AddTruckProps) => {
    const {register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors, isValid}} = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });    const [isPopupStopAddOpen, setIsPopupStopAddOpen] = useState(false);
    const tabRef = useRef(null);
    const [isPopupSuccessAddOpen, setIsPopupSuccessAddOpen] = useState(false);
    const [adrTimeCalendar, setAdrTimeCalendar] = useState(false);
    const [inspectionCalendar, setInspectionCalendar] = useState(false);
    const [svScanFile, setSvScanFile] = useState<any>("");
    const [protocolScanFile, setProtocolScanFile] = useState<any>("");
    const [adrScanFile, setAdrScanFile] = useState<any>("");
    const [selectedBrandTabs, setSelectedBrandTabs] = useState<any>({})
    const selectedBrandTab = watch("truck_brand")
    const [brandTabs, setBrandTabs] = useState<Array<any> | []>([])
    const [isBrandTabsOpen, setIsBrandTabsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [btnFetchLoader, setBtnFetchLoader] = useState(false)



    const handleSelectedBrand = (tab:any) => {
        setValue("truck_brand", tab.name, { shouldValidate: true })
        setSelectedBrandTabs(tab)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // @ts-ignore
            if (tabRef.current && !tabRef.current?.contains(event.target as Node)) {
                setIsBrandTabsOpen(false);
            }
        };
        // Додаємо прослуховування кліків
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Прибираємо прослуховування кліків
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getBrands()

        async function getBrands() {
            const response = await postData(requestUrl.getBrand, {})
            if (response?.data) setBrandTabs(response?.data)
        }
    }, [])

    const openBrandTabs = () => {
        console.log('click')
        setIsBrandTabsOpen(prevState => !prevState)
    }

    const inspectionCalendarMethods = {
        handleCalendarClose() {
            setInspectionCalendar(false)
        },
        handleCalendarClick() {
            setInspectionCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("inspection_time", selectedTime, { shouldValidate: true })
        },
        handleClearCalendarValue() {
            setValue("inspection_time", "", { shouldValidate: true })
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
            setValue("adr_time", "", { shouldValidate: true })
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

    function fillFormData(data:any) {

        const formData = new FormData();

        formData.append('model', data?.truck_model);
        formData.append('number', data?.truck_number);
        formData.append('brand', selectedBrandTabs?.guid);
        formData.append('weight', data?.truck_weight);
        formData.append('height', data?.truck_height);
        formData.append('length', data?.truck_length);
        formData.append('width', data?.truck_width);
        formData.append('numbersv', data?.techPassport_number);
        formData.append('protocol', convertDate(data?.inspection_time));
        formData.append('numberdop', data?.adr_number);
        formData.append('dopdate', convertDate(data?.adr_time));
        // file
        formData.append('svScan', svScanFile);
        formData.append('protocolScan', protocolScanFile);
        formData.append('adrScan', adrScanFile);

        return formData
    }

    const onSubmit = (data: any) => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);

        const formData:any =  fillFormData(data)

        async function addTruck (){
            setBtnFetchLoader(true)
            const responce = await postData(requestUrl.addTruck, formData, true)

            console.log(responce)

            if(responce.status === 204){
                setIsPopupSuccessAddOpen(true)
            }

            setIsSubmitting(false)
            setBtnFetchLoader(false)
        }

        addTruck()
        // console.log(data);
    };
    return (
        <AddNavigationLayout title={'НОВЕ АВТО'} closePage={popupStopMethods.openPopup}>
            <Box className={classNames(cls.AddTruck, {}, [className])}>
                <Box className={cls.AddTruck__container}>
                    <form className={cls.Form} onSubmit={handleSubmit(onSubmit)}>
                        {/*Форми.*/}
                        <Box className={cls.Form__SixForm}>
                            <Box flexWrap={'wrap'} className={cls.Form__block}>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="truck_number">Номер*</FormLabel>
                                    <Input
                                        style={{border: errors.truck_number && '1px solid red'}}

                                        disableUnderline={true}
                                        {...register("truck_number", {required: "Це поле є обовязковим",
                                            pattern: {
                                                value: /^[A-Za-z\d]+$/,
                                                message: "Використовуйте тільки латинські букви та цифри"
                                            }
                                        })} />
                                    {/*@ts-ignore*/}
                                    {errors?.truck_number && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.truck_number?.message}</Typography>}
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="truck_brand">Марка*</FormLabel>
                                    <Box ref={tabRef} position={'relative'} onClick={openBrandTabs}>
                                        <Input
                                            style={{border: errors.truck_brand && '1px solid red'}}
                                            disabled={true}
                                            disableUnderline={true}
                                            {...register("truck_brand", {required: "Це поле є обовязковим"})}
                                            className={classNames(cls.Form__group__tabInput, {open_tabs: isBrandTabsOpen})}
                                            endAdornment={
                                                <InputAdornment sx={{padding: '12px'}} position="end">
                                                    <MyArrow className={cls.NavBlock__arr_left} color={"#141414"}/>
                                                </InputAdornment>

                                            }
                                        />
                                        {/*@ts-ignore*/}
                                        {errors?.truck_brand && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.truck_brand?.message}</Typography>}

                                        <Box className={cls.Tabs}
                                             style={{display: isBrandTabsOpen ? 'block' : 'none'}}>
                                            {brandTabs.map(tab => (
                                                <Typography
                                                    key={tab.id}
                                                    onClick={() => handleSelectedBrand(tab)}
                                                    variant={'body1'}
                                                    className={classNames(cls.Tabs__tab, {selected_tab: selectedBrandTab === tab.name})}
                                                >
                                                    {tab.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="truck_model">Модель*</FormLabel>
                                    <Input
                                        style={{border: errors.truck_model && '1px solid red'}}
                                        disableUnderline={true}
                                        {...register("truck_model", {required: "Це поле є обовязковим"})} />
                                    {/*@ts-ignore*/}
                                    {errors?.truck_model && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.truck_model?.message}</Typography>}
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="truck_width">Ширина (мм)*</FormLabel>
                                    <Input
                                        style={{border: errors.truck_width && '1px solid red'}}
                                        disableUnderline={true}
                                        {...register("truck_width", {required: "Це поле є обовязковим", pattern: {
                                                value: /^[0-9]*$/,
                                                message: "Тільки цифри дозволені"
                                            }})} />
                                    {/*@ts-ignore*/}
                                    {errors?.truck_width && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.truck_width?.message}</Typography>}
                                </Box>
                            </Box>
                            <Box flexWrap={'wrap'} className={cls.Form__block}>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="truck_length">Довжина (мм)*</FormLabel>
                                    <Input
                                        style={{border: errors.truck_length && '1px solid red'}}
                                        disableUnderline={true}  {...register("truck_length", {required: "Це поле є обовязковим", pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Тільки цифри дозволені"
                                        }})} />
                                    {/*@ts-ignore*/}
                                    {errors?.truck_length && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.truck_length?.message}</Typography>}
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="truck_height">Висота (мм)*</FormLabel>
                                    <Input
                                        style={{border: errors.truck_height && '1px solid red'}}
                                        disableUnderline={true}  {...register("truck_height", {required: "Це поле є обовязковим", pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Тільки цифри дозволені"
                                        }})} />
                                    {/*@ts-ignore*/}
                                    {errors?.truck_height && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.truck_height?.message}</Typography>}
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="truck_weight">Маса без навантаження (кг)*</FormLabel>
                                    <Input
                                        style={{border: errors.truck_weight && '1px solid red'}}
                                        disableUnderline={true}  {...register("truck_weight", {required: "Це поле є обовязковим", pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Тільки цифри дозволені"
                                        }})} />
                                    {/*@ts-ignore*/}
                                    {errors?.truck_weight && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.truck_weight?.message}</Typography>}
                                </Box>
                            </Box>

                        </Box>
                        {/*Тех паспорт*/}
                        <Box className={cls.Form__TechPassport}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Свідоцтво держреєстрації
                                (техпаспорт)</Typography>
                            <Box className={cls.Form__TechPassport__info__block} width={'240px'}>
                                <FormLabel htmlFor="techPassport_number">Номер</FormLabel>
                                <Input
                                    disableUnderline={true}
                                    {...register("techPassport_number")} />
                                {/*{errors.lastName && <p>Це поле є обовязковим</p>}*/}
                            </Box>
                            <PassportUpload value={svScanFile} setValue={setSvScanFile}  text={'Завантажити скан свідоцтва'}/>
                        </Box>

                        {/*Протокол перевірки*/}
                        <Box className={cls.Form__Inspection}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Протокол перевірки
                                технічного стану</Typography>
                            <Box className={classNames(cls.Form__Inspection__block, {}, [cls.Form__calendar])}
                                 width={'240px'}>
                                <FormLabel htmlFor="inspection_time">Дійсний до</FormLabel>
                                <Input
                                    onClick={inspectionCalendarMethods.handleCalendarClick}
                                    disableUnderline={true} placeholder='00.00.0000'
                                    {...register("inspection_time", {required: false})}
                                    className={classNames(cls.searchBlock__calendarBlock__calendar,
                                        {open_inputCalendar: inspectionCalendar}
                                    )
                                    }
                                    endAdornment={
                                        <InputAdornment sx={{padding: '12px'}} position="end">
                                            <CalendarImg/>
                                        </InputAdornment>

                                    }/>
                                <ChooseDateCalendar
                                    clearTime={inspectionCalendarMethods.handleClearCalendarValue}
                                    setTime={inspectionCalendarMethods.handleSetCalendarValue}
                                    isOpen={inspectionCalendar}
                                    closeCalendar={inspectionCalendarMethods.handleCalendarClose}
                                    checkMinDate={true}
                                />
                            </Box>
                            <PassportUpload value={protocolScanFile} setValue={setProtocolScanFile} text={'Завантажити скан протоколу'}/>
                        </Box>

                        {/*Адр паспорт*/}
                        <Box display={'flex'} justifyContent={"space-between"} flexWrap={'wrap'} gap={'14px'}>
                            <Box className={cls.Form__Adr}>
                                <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Свідоцтво про допуск до
                                    перевезення небезпечних вантажів
                                    <br/>(ADR/Червона Смуга)</Typography>
                                <Box display={'flex'} gap={"8px"} flexWrap={'wrap'}>
                                    <Box className={cls.Form__Adr__block} width={'240px'}>
                                        <FormLabel htmlFor="adr_number">Номер</FormLabel>
                                        <Input
                                            disableUnderline={true}
                                            {...register("adr_number")} />
                                        {/*{errors.lastName && <p>Це поле є обовязковим</p>}*/}
                                    </Box>
                                    <Box className={classNames(cls.Form__Adr__block, {}, [cls.Form__calendar])}
                                         width={'240px'}>
                                        <FormLabel htmlFor="adr_time">Дійсний до</FormLabel>
                                        <Input
                                            onClick={adrTimeCalendarMethods.handleCalendarClick}
                                            disableUnderline={true} placeholder='00.00.0000'
                                            {...register("adr_time", {required: false})}
                                            className={classNames(cls.searchBlock__calendarBlock__calendar,
                                                {open_inputCalendar: adrTimeCalendar}
                                            )
                                            }
                                            endAdornment={
                                                <InputAdornment sx={{padding: '12px'}} position="end">
                                                    <CalendarImg/>
                                                </InputAdornment>

                                            }/>
                                        <ChooseDateCalendar
                                            position={true}
                                            clearTime={adrTimeCalendarMethods.handleClearCalendarValue}
                                            setTime={adrTimeCalendarMethods.handleSetCalendarValue}
                                            isOpen={adrTimeCalendar}
                                            closeCalendar={adrTimeCalendarMethods.handleCalendarClose}
                                            checkMinDate={true}
                                        />
                                    </Box>
                                </Box>

                                <PassportUpload value={adrScanFile} setValue={setAdrScanFile} text={'Завантажити скан свідотства'}/>
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
                <Typography textAlign={'center'} variant={'h2'} paddingBottom={'16px'}>Авто успішно додано!</Typography>
                <Typography textAlign={'center'} maxWidth={'350px'} variant={'body1'} paddingBottom={'30px'}>Дані про
                    авто додано в статусі <br/><Typography variant={'body1'} display={'inline'} fontWeight={'500'}>“очікує
                        підтвердження”</Typography>, після перевірки заявки, статус авто зміниться</Typography>
                <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'} gap={'20px'}>
                    <Button sx={{width: '240px'}} variant={'contained'}
                            onClick={popupSuccessMethods.closePopup}>OK</Button>
                </Box>
            </Popup>


        </AddNavigationLayout>
    );
};

export default AddTruck;