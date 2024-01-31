import cls from '../../components/pages/TthPage/ui/TthPage.module.scss'
import {Box, Input, InputAdornment, Typography} from "@mui/material";
import NavigationLayout from "../../components/widgets/NavigationLayout/ui/NavigationLayout";
import Answer from "../../public/images/icons/Answer.svg";
import {useEffect, useRef, useState} from "react";
import TtnItem from "../../components/entities/TthItem/ui/TtnItem";
import {classNames} from "../../components/shared/lib/classNames";
import CalendarImg from "../../public/images/icons/Calendar.svg";
import MyCalendar from "../../components/entities/MyCalendar/ui/MyCalendar";
import useTtnData, {filtersInTtn} from "../../components/shared/hooks/requestHooks/useTthData";
import {TtnType} from "../../components/types/TtnType";
import {useNewFilter} from "../../components/shared/hooks/requestHooks/useNewFilter";
import {useThrottlingProtect} from "../../components/shared/hooks/useTrottlingProtect";
import ZeroItems from "../../components/entities/ZeroItems/ui/ZeroItems";
import ClearIcon from "@mui/icons-material/Clear";
import MyLoading from "../../components/shared/ui/MyLoading/MyLoading";
import EmptyPage from "../../components/widgets/EmptyPage/ui/EmptyPage";

const tabTitles: string[] = ['№', 'Дата', 'Паливо', 'Об’єм (л)', 'Номер авто', 'Номер причепа', 'ПІБ водія']

const TtnPage = () => {
    const [tthData, fetchTthData] = useTtnData();
    const [page, setPage] = useState<number>(1);
    const [inputFilterByName, setInputFilterByName] = useState({
        "likeNumber": "",
        "truckNumber": "",
        "trailerNumber": "",
        "driverFullName": "",
    });
    const [calendarValue, setCalendarValue] = useState("");
    const [filters, setFilters, isFilterActive, checkIsFilterActive] = useNewFilter<filtersInTtn>({
        "likeNumber": null,
        "createdAtFrom": null,
        "createdAtTo": null,
        "truckNumber": null,
        "trailerNumber": null,
        "driverFullName": null,
    });
    const calendarRef = useRef();
    const isFirstRender = useRef(true);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const trottlingHandle = useThrottlingProtect();


    const inputFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        setInputFilterByName(prevState => ({
            ...prevState,
            [name]: value
        }))

        trottlingHandle(() => {
            setFilters(prev => ({
                ...prev,
                [name]: value
            }));
        }, 300);
    };


    const closeCalendar = () => {
        setIsCalendarOpen(false)
    };


    const handleClearCalendarValue = () => {
        setCalendarValue('')

    };

    const handleCalendarClick = () => {
        setIsCalendarOpen(prevState => !prevState)
    };

    const handleClearFilter = () => {
        setFilters({
            "likeNumber": null,
            "createdAtFrom": null,
            "createdAtTo": null,
            "truckNumber": null,
            "trailerNumber": null,
            "driverFullName": null,
        })
        setPage(1)
        setInputFilterByName({
            "likeNumber": "",
            "truckNumber": "",
            "trailerNumber": "",
            "driverFullName": "",
        })
        // @ts-ignore
        calendarRef.current?.clearCalendar()
    };

    const setTimeFilter = (from: string | null, to: string | null) => {
        setFilters(prev => ({
            ...prev,
            "createdAtFrom": from,
            "createdAtTo": from,

        }))
    };

    const handleSetCalendarValue = (from: string, to: string) => {
        setCalendarValue(`${from} - ${to}`)

    };


    useEffect(() => {
        console.log('render')
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        async function fetchInvoiceFilters() {
            await fetchTthData(page, filters)
            checkIsFilterActive()
        }

        fetchInvoiceFilters()

    }, [filters, page]);

    useEffect(()=>{
        console.log({filters, page})
    },[filters, page])

    const handleClearInput = (name: string) => {
        setInputFilterByName(prevState => ({
            ...prevState,
            [name]: ""
        }))

        setFilters(prev => ({
            ...prev,
            [name]: ""
        }));
    };



    return (
        <NavigationLayout title={'ТОВАРНО-ТРАНСПОРТНІ НАКЛАДНІ'} from={tthData?.meta.from} to={tthData?.meta.to}
                          total={tthData?.meta.total} setPage={setPage}>
            {tthData === undefined
                ?
                <MyLoading big={true}/>
                :
                tthData?.meta?.total || isFilterActive
                    ?
                    <Box className={cls.TthPage}>
                        <Box className={cls.TthPage__container}>
                            {/*Пошук та дава створення*/}
                            <Box className={cls.searchBlock}>
                                <Box className={cls.searchBlock__inputBlock}>
                                    <Input name='likeNumber' onChange={inputFilter} value={inputFilterByName.likeNumber}
                                           disableUnderline={true} fullWidth={true}
                                           className={classNames(cls.searchBlock__inputBlock__input, {active_input: inputFilterByName.likeNumber})}
                                           placeholder='Пошук по номеру'
                                           endAdornment={
                                               inputFilterByName.likeNumber && <InputAdornment
                                                   onClick={() => handleClearInput('likeNumber')}
                                                   sx={{padding: '12px'}}
                                                   position="end">
                                                   <ClearIcon/>
                                               </InputAdornment>

                                           }
                                    />
                                    <Box className={cls.searchBlock__inputBlock__answer}>
                                        <Answer className={cls.searchBlock__inputBlock__img}/>
                                        <Box className={cls.searchBlock__inputBlock__answerBlock}>
                                            <Box padding='14px'>
                                                <Typography variant='body2' lineHeight='12px' fontSize='10px'  >Вкажіть номер у встановленому
                                                    форматі:</Typography>
                                                <Typography variant='body2' lineHeight='12px'fontSize='10px' >1. УНТК-ДТ-00001776</Typography>
                                                <Typography variant='body2' lineHeight='12px'fontSize='10px' >2. УНТК-ТД-ТД00-003143</Typography>
                                                <Typography variant='body2' lineHeight='12px'fontSize='10px' paddingTop='10px'>Усі літери великі та
                                                    кирилицею.</Typography>

                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className={cls.searchBlock__calendarBlock}>
                                    {/*calendar*/}
                                    <Box className={cls.searchBlock__calendarBlock__inputsBox}>
                                        <Box className={cls.searchBlock__calendarBlock__container}>
                                            <Input onClick={handleCalendarClick} value={calendarValue}
                                                   disableUnderline={true} fullWidth={true} placeholder='Дата створення'
                                                   className={classNames(cls.searchBlock__calendarBlock__calendar, {open_inputCalendar: isCalendarOpen})}
                                                   endAdornment={
                                                       <InputAdornment sx={{padding: '12px'}} position="end">
                                                           <CalendarImg/>
                                                       </InputAdornment>

                                                   }/>
                                            <MyCalendar clearTime={handleClearCalendarValue}
                                                        closeCalendar={closeCalendar} isOpen={isCalendarOpen}
                                                        setFilter={setTimeFilter} ref={calendarRef}
                                                        setTime={handleSetCalendarValue}/>
                                        </Box>
                                        <Input name='driverFullName' onChange={inputFilter}
                                               value={inputFilterByName.driverFullName}
                                               disableUnderline={true} fullWidth={true} placeholder='ПІБ водія'
                                               className={classNames(cls.searchBlock__calendarBlock__calendar, {active_input: inputFilterByName.driverFullName})}
                                               endAdornment={
                                                   inputFilterByName.driverFullName && <InputAdornment
                                                       onClick={() => handleClearInput('driverFullName')}
                                                       sx={{padding: '12px'}}
                                                       position="end">
                                                       <ClearIcon/>
                                                   </InputAdornment>

                                               }
                                        />
                                        <Input name='truckNumber' onChange={inputFilter}
                                               value={inputFilterByName.truckNumber}
                                               disableUnderline={true} fullWidth={true} placeholder='Номер авто'
                                               className={classNames(cls.searchBlock__calendarBlock__calendar, {active_input: inputFilterByName.truckNumber})}
                                               endAdornment={
                                                   inputFilterByName.truckNumber && <InputAdornment
                                                       onClick={() => handleClearInput('truckNumber')}
                                                       sx={{padding: '12px'}}
                                                       position="end">
                                                       <ClearIcon/>
                                                   </InputAdornment>

                                               }
                                        />
                                        <Input name='trailerNumber' onChange={inputFilter}
                                               value={inputFilterByName.trailerNumber}
                                               disableUnderline={true} fullWidth={true} placeholder='Номер причепа'
                                               className={classNames(cls.searchBlock__calendarBlock__calendar, {active_input: inputFilterByName.trailerNumber})}
                                               endAdornment={
                                                   inputFilterByName.trailerNumber && <InputAdornment
                                                       onClick={() => handleClearInput('trailerNumber')}
                                                       sx={{padding: '12px'}}
                                                       position="end">
                                                       <ClearIcon/>
                                                   </InputAdornment>

                                               }
                                        />
                                    </Box>
                                    <Typography variant='h5' fontSize='14px' color='#ADB5BD'
                                                className={cls.searchBlock__calendarBlock__clear}
                                                onClick={handleClearFilter}
                                    >
                                        Очистити фільтр
                                    </Typography>
                                </Box>
                            </Box>

                            {/*Заголовки накладної*/}
                            <Box className={cls.headerInvoices}>
                                <Box className={cls.headerInvoices__container}>
                                    <Box className={cls.headerInvoices__dataTabs}>
                                        {tabTitles.map(tab => (
                                            <Typography key={tab} variant='h5'
                                                        className={cls.headerInvoices__dataTabs__tab}>{tab}</Typography>
                                        ))}
                                    </Box>
                                    <Typography variant='h5' color='6A7178'
                                                className={cls.headerInvoices__pdf}>Pdf</Typography>
                                </Box>
                            </Box>

                            {/*Накладна*/}
                            <Box className={cls.TthItems}>
                                {tthData?.meta?.total ?
                                    tthData?.data.map(tth => (
                                        <TtnItem key={tth.id} tth={tth}/>
                                    ))
                                    : <ZeroItems/>
                                }
                            </Box>
                        </Box>
                    </Box>
                    :
                    <EmptyPage>Тут будуть відображатися
                        ваші ТТН</EmptyPage>


            }
        </NavigationLayout>
    );
};

export default TtnPage;