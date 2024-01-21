import cls from './AddTrailer.module.scss'
import {classNames} from "../../../../shared/lib/classNames";
import AddNavigationLayout from "../../../../widgets/AddNavigationLayout/ui/AddNavigationLayout";
import {Box, Button, FormLabel, Input, InputAdornment, MenuItem, Select, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import React, {useEffect, useRef, useState} from "react";
import CalendarImg from "../../../../../public/images/icons/Calendar.svg";
import ChooseDateCalendar from "../../../../entities/ChooseDateCalendar/ui/ChooseDateCalendar";
import PassportUpload from "../../../../shared/ui/PassportUpload/PassportUpload";
import Popup from "../../../../widgets/Popup/ui/Popup";
import {convertDate} from "../../../../shared/function/formattedDateFunc";
import {postData} from "../../../../../api/api";
import {MyArrow} from "../../../../shared/ui/Arrow/Arrow";
import MyLoading from "../../../../shared/ui/MyLoading/MyLoading";
import {LoadingButton} from "@mui/lab";

interface AddTrailerProps {
    className?: string;
    closePage: () => void;
}


export const requestUrl = {
    addTrailer: '/front/vehicle/add-trailer',
    getSectionsTotal: '/front/total-sections',
    getSections: '/front/sections',
    getBrand: '/front/vehicle/brands',
}

export type sectionTab = {
    guid: string;
    id: number,
    name: string
}


export const createArray = (length: any) => {
    return Array.from({length}, (_, index) => index + 1);
};


const AddTrailer = ({closePage}: AddTrailerProps) => {
    let totalSectionCount = 0;
    const {register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors, isValid}} = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });
    const selectedTab = watch("trailer_numSections")
    const selectedBrandTab = watch("trailer_brand")
    const sectionCountAll = watch("trailer_capacity")
    const tabRef = useRef(null);
    const sectionRef = useRef(null);
    const [brandTabs, setBrandTabs] = useState<Array<any> | []>([])
    const [isBrandTabsOpen, setIsBrandTabsOpen] = useState(false)
    const [isPopupStopAddOpen, setIsPopupStopAddOpen] = useState(false);
    const [isPopupSuccessAddOpen, setIsPopupSuccessAddOpen] = useState(false);
    const [sectionTabs, setSectionTabs] = useState<Array<sectionTab> | []>([])
    const [sectionTotalTabs, setSectionTotalTabs] = useState<Array<sectionTab> | []>([])
    const [selectedBrandTabs, setSelectedBrandTabs] = useState<any>({})
    const [selectedSectionTotalTabs, setSelectedSectionTotalTabs] = useState<any>({})
    const [isSectionTabsOpen, setIsSectionTabsOpen] = useState(false)
    const [inspectionCalendar, setInspectionCalendar] = useState(false);
    const [svScanFile, setSvScanFile] = useState<any>("");
    const [adrScanFile, setAdrScanFile] = useState<any>("");
    const [protocolScanFile, setProtocolScanFile] = useState<any>("");
    const [tarScanFile, setTarScanFile] = useState<any>("");
    const [checkScanFile, setCheckScanFile] = useState<any>("");
    const [tariffPassportTimeCalendar, setTariffPassportTimeCalendar] = useState(false);
    const [adrCalendar, setAdrCalendar] = useState(false);
    const [protocolCalendar, setProtocolCalendar] = useState(false);
    const [certificateTimeCalendar, setCertificateTimeCalendar] = useState(false);
    const [certificateIssuedCalendar, setCertificateIssuedCalendar] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [btnFetchLoader, setBtnFetchLoader ] = useState(false)
    const certificateTimeCalendarMethods = {
        handleCalendarClose() {
            setCertificateTimeCalendar(false)
        },
        handleCalendarClick() {
            setCertificateTimeCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("certificate_time", selectedTime)
        },
        handleClearCalendarValue() {
            setValue("certificate_time", "")
        }
    }
    const certificateIssuedCalendarMethods = {
        handleCalendarClose() {
            setCertificateIssuedCalendar(false)
        },
        handleCalendarClick() {
            setCertificateIssuedCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("certificate_issued", selectedTime)
        },
        handleClearCalendarValue() {
            setValue("certificate_issued", "")
        }
    }
    const adrCalendarTimeMethods = {
        handleCalendarClose() {
            setAdrCalendar(false)
        },
        handleCalendarClick() {
            setAdrCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("adr_time", selectedTime)
        },
        handleClearCalendarValue() {
            setValue("adr_time", "")
        }
    }
    const protocolCalendarMethods = {
        handleCalendarClose() {
            setProtocolCalendar(false)
        },
        handleCalendarClick() {
            setProtocolCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("protocol_time", selectedTime)
        },
        handleClearCalendarValue() {
            setValue("protocol_time", "")
        }
    }
    const tariffPassportTimeCalendarMethods = {
        handleCalendarClose() {
            setTariffPassportTimeCalendar(false)
        },
        handleCalendarClick() {
            setTariffPassportTimeCalendar(prevState => !prevState)
        },
        handleSetCalendarValue(selectedTime: string) {
            setValue("tariffPassport_time", selectedTime)
        },
        handleClearCalendarValue() {
            setValue("tariffPassport_time", "")
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


    function fillFormData(data: any) {

        const formData = new FormData();

        console.log(selectedBrandTabs)

        formData.append('model', data?.trailer_model);
        formData.append('number', data?.trailer_number);
        formData.append('brand', selectedBrandTabs?.guid);
        formData.append('weight', data?.trailer_weight);
        formData.append('height', data?.trailer_height);
        formData.append('length', data?.trailer_length);
        formData.append('width', data?.trailer_width);
        formData.append('numbersv', data?.techPassport_number);
        formData.append('dopdate', convertDate(data?.adr_time));
        formData.append('numbertype', data?.tunk_number);
        formData.append('numbercheck', data?.certificate_number);
        formData.append('checkdate', convertDate(data?.certificate_issued));
        formData.append('datestopsv', convertDate(data?.certificate_time));

        formData.append('section', selectedSectionTotalTabs?.guid);
        for (let i = 0; i < +selectedSectionTotalTabs?.name; i++){
            formData.append(`sections[${i}][section]`, sectionTabs[i]?.guid);
            formData.append(`sections[${i}][volume]`, watch(`section_${i + 1}`));
        }

        formData.append('tarScan', tarScanFile);
        formData.append('svScan', svScanFile);
        formData.append('protocolScan', protocolScanFile);
        formData.append('checkScan', checkScanFile);
        formData.append('adrScan', adrScanFile);

        formData.append('protocolsv', convertDate(data?.protocol_time));
        formData.append('numberdop', data?.adr_number);

        formData.append('volume', data?.trailer_capacity);
        formData.append('tarpass', data?.tariffPassport_number);
        formData.append('tarissue', data?.tariffPassport_issued);
        formData.append('tardate', convertDate(data?.tariffPassport_time));

        return formData
    }

    const openSectionTabs = () => {
        console.log('click')
        setIsSectionTabsOpen(prevState => !prevState)
    }

    const openBrandTabs = () => {
        console.log('click')
        setIsBrandTabsOpen(prevState => !prevState)
    }

    const handleSelectTab = (tab :any) => {
        setSelectedSectionTotalTabs(tab)
        setValue("trailer_numSections", tab.name, { shouldValidate: true })
    }

    const handleSelectedBrand = (tab:any) => {
        console.log(tab)
        console.log('handleSelectedBrand')
        setValue("trailer_brand", tab.name, { shouldValidate: true })
        setSelectedBrandTabs(tab)
    }
    const onSubmit = (data: any) => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true)

        const formData: any = fillFormData(data)
        async function addTrailer() {
            setBtnFetchLoader(true)
            const responce = await postData(requestUrl.addTrailer, formData, true)
            console.log(responce)

            if(responce.status === 204){
                setIsPopupSuccessAddOpen(true)
            }

            setIsSubmitting(false)
            setBtnFetchLoader(false)
        }

        if(+sectionCountAll === totalSectionCount) addTrailer()
    };



    useEffect(() => {
        getBrands()

        async function getBrands() {
            const response = await postData(requestUrl.getBrand, {})
            if (response?.data) setBrandTabs(response?.data)
        }
    }, [])

    useEffect(() => {
        getSections()

        async function getSections() {
            const response = await postData(requestUrl.getSections, {})
            if (response?.data) setSectionTabs(response?.data)
        }
    }, [])

    useEffect(() => {
        getSectionsTotal()

        async function getSectionsTotal() {
            const response = await postData(requestUrl.getSectionsTotal, {})
            if (response?.data) setSectionTotalTabs(response?.data)
        }
    }, [])




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
        const handleClickOutside = (event: MouseEvent) => {
            // @ts-ignore
            if (sectionRef.current && !sectionRef.current?.contains(event.target as Node)) {
                setIsSectionTabsOpen(false);
            }
        };
        // Додаємо прослуховування кліків
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Прибираємо прослуховування кліків
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    for (let i = 0; i < +selectedSectionTotalTabs?.name; i++){
        totalSectionCount += Number(watch(`section_${i + 1}`))
    }


    return (
        <AddNavigationLayout title={'НОВИЙ ПРИЧІП'} closePage={popupStopMethods.openPopup}>
            <Box className={classNames(cls.AddTrailer,)}>
                <Box className={cls.AddTrailer__container}>
                    <form className={cls.Form} onSubmit={handleSubmit(onSubmit)}>
                        {/*Форми*/}
                        <Box className={cls.Form__SixForm}>
                            <Box flexWrap={'wrap'} className={cls.Form__block}>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="trailer_number">Номер*</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        style={{border: errors.trailer_number && '1px solid red'}}
                                        {...register("trailer_number", {required: "Це поле є обовязковим", pattern: {
                                                value: /^[A-Za-z\d]+$/,
                                                message: "Використовуйте тільки латинські букви та цифри"
                                            }})} />
                                    {/*@ts-ignore*/}
                                    {errors?.trailer_number && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.trailer_number?.message}</Typography>}
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="trailer_brand">Марка*</FormLabel>
                                    <Box position={'relative'} ref={tabRef} onClick={openBrandTabs}>
                                        <Input
                                            disabled={true}
                                            style={{border: errors.trailer_brand && '1px solid red'}}
                                            disableUnderline={true}
                                            {...register("trailer_brand", {required: "Це поле є обовязковим"})}
                                            className={classNames(cls.Form__group__tabInput, {open_tabs: isBrandTabsOpen})}
                                            endAdornment={
                                                <InputAdornment sx={{padding: '12px'}} position="end">
                                                    <MyArrow className={cls.NavBlock__arr_left} color={"#141414"}/>
                                                </InputAdornment>

                                            }
                                        />
                                        {/*@ts-ignore*/}
                                        {errors?.trailer_brand && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.trailer_brand?.message}</Typography>}

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
                                    <FormLabel htmlFor="trailer_model">Модель*</FormLabel>
                                    <Input
                                        style={{border: errors.trailer_model && '1px solid red'}}
                                        disableUnderline={true}
                                        {...register("trailer_model", {required: "Це поле є обовязковим"})} />
                                    {/*@ts-ignore*/}
                                    {errors?.trailer_model && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.trailer_model?.message}</Typography>}
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="trailer_width">Ширина (мм)*</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        style={{border: errors.trailer_width && '1px solid red'}}
                                        {...register("trailer_width", {required: "Це поле є обовязковим", pattern: {
                                                value: /^[0-9]*$/,
                                                message: "Тільки цифри дозволені"
                                            }})} />
                                    {/*@ts-ignore*/}
                                    {errors?.trailer_width && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.trailer_width?.message}</Typography>}
                                </Box>
                            </Box>
                            <Box flexWrap={'wrap'} className={cls.Form__block}>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="trailer_length">Довжина (мм)*</FormLabel>
                                    <Input
                                        style={{border: errors.trailer_length && '1px solid red'}}
                                        disableUnderline={true}  {...register("trailer_length", {required: "Це поле є обовязковим", pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Тільки цифри дозволені"
                                        }})} />
                                    {/*@ts-ignore*/}
                                    {errors?.trailer_length && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.trailer_length?.message}</Typography>}
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="trailer_height">Висота (мм)*</FormLabel>
                                    <Input
                                        style={{border: errors.trailer_height && '1px solid red'}}
                                        disableUnderline={true}  {...register("trailer_height", {required: "Це поле є обовязковим", pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Тільки цифри дозволені"
                                        }})} />
                                    {/*@ts-ignore*/}
                                    {errors?.trailer_height && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.trailer_height?.message}</Typography>}
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="trailer_weight">Маса без навантаження (кг)*</FormLabel>
                                    <Input
                                        style={{border: errors.trailer_weight && '1px solid red'}}
                                        disableUnderline={true}  {...register("trailer_weight", {required: "Це поле є обовязковим", pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Тільки цифри дозволені"
                                        }})} />
                                    {/*@ts-ignore*/}
                                    {errors?.trailer_weight && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.trailer_weight?.message}</Typography>}
                                </Box>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="trailer_capacity">Максимальна місткість*</FormLabel>
                                    <Input
                                        style={{border: errors.trailer_capacity && '1px solid red'}}
                                        disableUnderline={true}  {...register("trailer_capacity", {required: false,  pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Тільки цифри дозволені"
                                        }})} />
                                    {/*@ts-ignore*/}
                                    {errors?.trailer_capacity && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.trailer_capacity?.message}</Typography>}
                                    {!errors?.trailer_capacity && +sectionCountAll !== totalSectionCount && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{`Місткість не відповідає введеній к-сті: ${totalSectionCount}`}</Typography>}
                                </Box>
                            </Box>
                            <Box flexWrap={'wrap'} className={cls.Form__block}>
                                <Box className={cls.Form__group}>
                                    <FormLabel htmlFor="trailer_numSections">К-сть секцій*</FormLabel>
                                    <Box ref={sectionRef} position={'relative'} onClick={openSectionTabs}>
                                        <Input
                                            disabled={true}
                                            style={{border: errors.trailer_numSections && '1px solid red'}}
                                            className={classNames(cls.Form__group__tabInput, {open_tabs: isSectionTabsOpen})}
                                            disableUnderline={true}  {...register("trailer_numSections", {required: "Це поле є обовязковим"})}
                                            endAdornment={
                                                <InputAdornment sx={{padding: '12px'}} position="end">
                                                    <MyArrow className={cls.NavBlock__arr_left} color={"#141414"}/>
                                                </InputAdornment>

                                            }
                                        />
                                        {/*@ts-ignore*/}
                                        {errors?.trailer_numSections && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.trailer_numSections?.message}</Typography>}
                                        <Box className={cls.Tabs}
                                             style={{display: isSectionTabsOpen ? 'block' : 'none'}}>
                                            {sectionTotalTabs.map(tab => (
                                                <Typography
                                                    key={tab.id}
                                                    onClick={() => handleSelectTab(tab)}
                                                    variant={'body1'}
                                                    className={classNames(cls.Tabs__tab, {selected_tab: selectedTab === tab.name})}
                                                >
                                                    {tab.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                        {/*Cекції*/}
                        <Box className={cls.Form__Sections}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Об&apos;єм (л) кожної з
                                секцій</Typography>
                            <Box display={'flex'} gap={"14px"} flexWrap={'wrap'}>


                                {
                                    selectedTab
                                        ?  sectionTabs.map((item, index) => (
                                            index < +selectedSectionTotalTabs?.name && (
                                                <Box key={index} className={cls.Form__Sections__info__block} width={'110px'}>
                                                    <FormLabel htmlFor={`section_${index + 1}`}>{index + 1}*</FormLabel>
                                                    <Input
                                                        style={{border: errors?.[`section_${index + 1}`] && '1px solid red'}}
                                                        disableUnderline={true}
                                                        {...register(`section_${index + 1}`, {required: "Це поле є обовязковим", pattern: {
                                                                value: /^[0-9]*$/,
                                                                message: "Тільки цифри дозволені"
                                                            }} )}
                                                    />
                                                    {/*@ts-ignore*/}
                                                    {errors?.[`section_${index + 1}`] && <Typography variant={'body1'} fontSize={'12px'} color={'error'}>{errors?.[`section_${index + 1}`]?.message}</Typography>}
                                                </Box>
                                            )
                                        ))
                                        : (
                                            <Box className={cls.Form__Sections__info__block} width={'110px'}>
                                                <FormLabel htmlFor="section_1">1*</FormLabel>
                                                <Input
                                                    disableUnderline={true}
                                                    {...register("section_1")} />
                                                {/*{errors.lastName && <p>Це поле є обовязковим</p>}*/}
                                            </Box>)
                                }
                            </Box>
                        </Box>

                        {/*Тарувальний паспорт*/}
                        <Box className={cls.Form__TariffPassport}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Тарувальний
                                паспорт</Typography>
                            <Box display={'flex'} gap={"8px"} flexWrap={'wrap'}>
                                <Box className={cls.Form__TariffPassport__block} width={'490px'}>
                                    <FormLabel htmlFor="tariffPassport_issued">Ким виданий</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        {...register("tariffPassport_issued")} />
                                </Box>
                                <Box className={cls.Form__TariffPassport__block} width={'240px'}>
                                    <FormLabel htmlFor="tariffPassport_number">Номер</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        {...register("tariffPassport_number")} />
                                </Box>
                                <Box className={classNames(cls.Form__TariffPassport__block, {}, [cls.Form__calendar])}
                                     width={'240px'}>
                                    <FormLabel htmlFor="tariffPassport_time">Виданий</FormLabel>
                                    <Input
                                        onClick={tariffPassportTimeCalendarMethods.handleCalendarClick}
                                        disableUnderline={true} placeholder='00.00.0000'
                                        {...register("tariffPassport_time", {required: false})}
                                        className={classNames(cls.searchBlock__calendarBlock__calendar,
                                            {open_inputCalendar: tariffPassportTimeCalendar}
                                        )
                                        }
                                        endAdornment={
                                            <InputAdornment sx={{padding: '12px'}} position="end">
                                                <CalendarImg/>
                                            </InputAdornment>

                                        }/>
                                    <ChooseDateCalendar
                                        position={true}
                                        clearTime={tariffPassportTimeCalendarMethods.handleClearCalendarValue}
                                        setTime={tariffPassportTimeCalendarMethods.handleSetCalendarValue}
                                        isOpen={tariffPassportTimeCalendar}
                                        closeCalendar={tariffPassportTimeCalendarMethods.handleCalendarClose}
                                    />
                                </Box>
                            </Box>

                            <PassportUpload value={tarScanFile} setValue={setTarScanFile}
                                            text={'Завантажити скан паспорту (Pdf формат)'}/>
                        </Box>


                        {/*Техпаспорт*/}
                        <Box className={cls.Form__TechPassport}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Свідоцтво держреєстрації
                                (техпаспорт) бочки/цистерни</Typography>
                            <Box className={cls.Form__TechPassport__block} width={'240px'}>
                                <FormLabel htmlFor="techPassport_number">Номер</FormLabel>
                                <Input
                                    disableUnderline={true}
                                    {...register("techPassport_number")} />
                            </Box>
                            <PassportUpload value={svScanFile} setValue={setSvScanFile}
                                            text={'Завантажити скан свідоцтва'}/>
                        </Box>

                        {/*Протокол*/}
                        <Box className={cls.Form__Protocol}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Протокол перевірки
                                технічного стану бочки/цистерни</Typography>
                            <Box className={classNames(cls.Form__Protocol__block, {}, [cls.Form__calendar])}
                                 width={'240px'}>
                                <FormLabel htmlFor="protocol_time">Дійсний до</FormLabel>
                                <Input
                                    onClick={protocolCalendarMethods.handleCalendarClick}
                                    disableUnderline={true} placeholder='00.00.0000'
                                    {...register("protocol_time", {required: false})}
                                    className={classNames(cls.searchBlock__calendarBlock__calendar,
                                        {open_inputCalendar: protocolCalendar}
                                    )
                                    }
                                    endAdornment={
                                        <InputAdornment sx={{padding: '12px'}} position="end">
                                            <CalendarImg/>
                                        </InputAdornment>

                                    }/>
                                <ChooseDateCalendar
                                    clearTime={protocolCalendarMethods.handleClearCalendarValue}
                                    setTime={protocolCalendarMethods.handleSetCalendarValue}
                                    isOpen={protocolCalendar}
                                    closeCalendar={protocolCalendarMethods.handleCalendarClose}
                                    checkMinDate={true}
                                />
                            </Box>
                            <PassportUpload value={protocolScanFile} setValue={setProtocolScanFile}
                                            text={'Завантажити скан протоколу'}/>
                        </Box>

                        {/*Адр паспорт*/}
                        <Box className={cls.Form__Adr}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Свідоцтва про допуск до
                                перевезення небезпечних вантажів
                                <br/>бочки/цистерни (ADR/Червона Смуга)</Typography>
                            <Box display={'flex'} gap={"8px"} flexWrap={'wrap'}>
                                <Box className={cls.Form__Adr__block} width={'240px'}>
                                    <FormLabel htmlFor="adr_number">Номер</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        {...register("adr_number")} />
                                </Box>
                                <Box className={classNames(cls.Form__Adr__block, {}, [cls.Form__calendar])}
                                     width={'240px'}>
                                    <FormLabel htmlFor="adr_time">Дійсний до</FormLabel>
                                    <Input
                                        onClick={adrCalendarTimeMethods.handleCalendarClick}
                                        disableUnderline={true} placeholder='00.00.0000'
                                        {...register("adr_time", {required: false})}
                                        className={classNames(cls.searchBlock__calendarBlock__calendar,
                                            {open_inputCalendar: adrCalendar}
                                        )
                                        }
                                        endAdornment={
                                            <InputAdornment sx={{padding: '12px'}} position="end">
                                                <CalendarImg/>
                                            </InputAdornment>

                                        }/>
                                    <ChooseDateCalendar
                                        position={true}
                                        clearTime={adrCalendarTimeMethods.handleClearCalendarValue}
                                        setTime={adrCalendarTimeMethods.handleSetCalendarValue}
                                        isOpen={adrCalendar}
                                        closeCalendar={adrCalendarTimeMethods.handleCalendarClose}
                                        checkMinDate={true}
                                    />
                                </Box>
                            </Box>

                            <PassportUpload value={checkScanFile} setValue={setCheckScanFile}
                                            text={'Завантажити скан свідотства'}/>
                        </Box>

                        {/*Адр паспорт*/}
                        <Box className={cls.Form__Certificate}>
                            <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Свідоцтво про перевірку
                                бочки/цистерни</Typography>
                            <Box display={'flex'} gap={"8px"} flexWrap={'wrap'}>
                                <Box className={cls.Form__Certificate__block} width={'240px'}>
                                    <FormLabel htmlFor="certificate_number">Номер</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        {...register("certificate_number")} />
                                    {/*{errors.lastName && <p>Це поле є обовязковим</p>}*/}
                                </Box>
                                <Box className={classNames(cls.Form__Certificate__block, {}, [cls.Form__calendar])}
                                     width={'240px'}>
                                    <FormLabel htmlFor="certificate_issued">Виданий</FormLabel>
                                    <Input
                                        onClick={certificateIssuedCalendarMethods.handleCalendarClick}
                                        disableUnderline={true} placeholder='00.00.0000'
                                        {...register("certificate_issued", {required: false})}
                                        className={classNames(cls.searchBlock__calendarBlock__calendar,
                                            {open_inputCalendar: certificateIssuedCalendar}
                                        )
                                        }
                                        endAdornment={
                                            <InputAdornment sx={{padding: '12px'}} position="end">
                                                <CalendarImg/>
                                            </InputAdornment>

                                        }/>
                                    <ChooseDateCalendar
                                        position={true}
                                        clearTime={certificateIssuedCalendarMethods.handleClearCalendarValue}
                                        setTime={certificateIssuedCalendarMethods.handleSetCalendarValue}
                                        isOpen={certificateIssuedCalendar}
                                        closeCalendar={certificateIssuedCalendarMethods.handleCalendarClose}
                                    />
                                </Box>
                                <Box className={classNames(cls.Form__Certificate__block, {}, [cls.Form__calendar])}
                                     width={'240px'}>
                                    <FormLabel htmlFor="certificate_time">Дійсний до</FormLabel>
                                    <Input
                                        onClick={certificateTimeCalendarMethods.handleCalendarClick}
                                        disableUnderline={true} placeholder='00.00.0000'
                                        {...register("certificate_time", {required: false})}
                                        className={classNames(cls.searchBlock__calendarBlock__calendar,
                                            {open_inputCalendar: certificateTimeCalendar}
                                        )
                                        }
                                        endAdornment={
                                            <InputAdornment sx={{padding: '12px'}} position="end">
                                                <CalendarImg/>
                                            </InputAdornment>

                                        }/>
                                    <ChooseDateCalendar
                                        position={true}
                                        clearTime={certificateTimeCalendarMethods.handleClearCalendarValue}
                                        setTime={certificateTimeCalendarMethods.handleSetCalendarValue}
                                        isOpen={certificateTimeCalendar}
                                        closeCalendar={certificateTimeCalendarMethods.handleCalendarClose}
                                        checkMinDate={true}
                                    />
                                </Box>
                            </Box>

                            <PassportUpload value={adrScanFile} setValue={setAdrScanFile}
                                            text={'Завантажити скан свідотства'}/>
                        </Box>


                        {/*Номер цистерни*/}
                        <Box display={'flex'} justifyContent={"space-between"} alignItems={'center'} flexWrap={'wrap'}
                             gap={'14px'}>
                            <Box className={cls.Form__TunkNum}>
                                <Typography variant={'h3'} fontSize={'14px'} lineHeight={'14px'}>Номер затвердження типу
                                    цистерни</Typography>
                                <Box className={cls.Form__TunkNum__block} width={'240px'}>
                                    <FormLabel htmlFor="tunk_number">Номер</FormLabel>
                                    <Input
                                        disableUnderline={true}
                                        {...register("tunk_number")} />
                                    {/*{errors.lastName && <p>Це поле є обовязковим</p>}*/}
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
                <Typography textAlign={'center'} variant={'h2'} paddingBottom={'16px'}>Причеп успішно додано!</Typography>
                <Typography textAlign={'center'} maxWidth={'350px'} variant={'body1'} paddingBottom={'30px'}>Дані про
                    причіп додано в статусі <br/><Typography variant={'body1'} display={'inline'} fontWeight={'500'}>“очікує
                        підтвердження”</Typography>, після перевірки заявки, статус причепа зміниться</Typography>
                <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'} gap={'20px'}>
                    <Button sx={{width: '240px'}} variant={'contained'} onClick={popupSuccessMethods.closePopup}>OK</Button>
                </Box>
            </Popup>


        </AddNavigationLayout>
    );
};

export default AddTrailer;