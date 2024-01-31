import cls from '../../components/pages/InvoicesPage/ui/InvoicesPage.module.scss'
import {Box, Button, Input, InputAdornment, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import Answer from "../../public/images/icons/Answer.svg"
import CalendarImg from "../../public/images/icons/Calendar.svg"
import useInvoiceData, {filtersInInvoice} from "../../components/shared/hooks/requestHooks/useInvoiceData";
import NavigationLayout from "../../components/widgets/NavigationLayout/ui/NavigationLayout";
import MyCalendar from "../../components/entities/MyCalendar/ui/MyCalendar";
import {classNames} from "../../components/shared/lib/classNames";
import {useNewFilter} from "../../components/shared/hooks/requestHooks/useNewFilter";
import {useThrottlingProtect} from "../../components/shared/hooks/useTrottlingProtect";
import ZeroItems from "../../components/entities/ZeroItems/ui/ZeroItems";
import ClearIcon from '@mui/icons-material/Clear';
import MyLoading from "../../components/shared/ui/MyLoading/MyLoading";
import EmptyPage from "../../components/widgets/EmptyPage/ui/EmptyPage";
import InvoiceItem from "../../components/entities/InvoiceItem/ui/InvoiceItem";
import {getAllTransfer} from "../../components/shared/config/alchemy/functions/getTransactions";


const tabTitles: string[] = ['№', 'Дата', 'Паливо', 'Об’єм (л)', 'Сумма (грн)'];

const InvoicesPage = () => {
    // const [invoiceData, fetchInvoiceData] = useInvoiceData();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [filters, setFilters, isFilterActive, checkIsFilterActive] = useNewFilter<filtersInInvoice>({
        "likeNumber": null,
        "createdAtFrom": null,
        "createdAtTo": null,
    });
    const [inputFilterByName, setInputFilterByName] = useState<string>("");
    const [calendarValue, setCalendarValue] = useState("");
    const trottlingHandle = useThrottlingProtect();
    const calendarRef = useRef();
    const isFirstRender = useRef(true);
    const inputByNumberFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target

        const result = await getAllTransfer(value)

        console.log(result)

        setInputFilterByName(value)

        trottlingHandle(() => {
            setFilters(prev => ({
                ...prev,
                "likeNumber": value
            }));
        }, 300);
    };


    const setTimeFilter = (from: string | null, to: string | null) => {
        setFilters(prev => ({
            ...prev,
            "createdAtFrom": from,
            "createdAtTo": from,

        }))
    };


    const handleClearCalendarValue = () => {
        setCalendarValue('')

    };
    const handleSetCalendarValue = (from: string, to: string) => {
        setCalendarValue(`${from} - ${to}`)

    };


    const handleCalendarClick = () => {
        setIsCalendarOpen(prevState => !prevState)
    };

    const closeCalendar = () => {
        setIsCalendarOpen(false)

    };

    const handleClearFilter = () => {
        setFilters({
            "likeNumber": null,
            "createdAtFrom": null,
            "createdAtTo": null,
        })
        setPage(1)
        setInputFilterByName("")
        //clear calendar
        // @ts-ignore
        calendarRef.current?.clearCalendar()

    };

    const handleClearInput = () => {
        setInputFilterByName('')

        setFilters(prev => ({
            ...prev,
            likeNumber: null
        }));
    };


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        fetchInvoiceFilters()

        async function fetchInvoiceFilters() {
            // await fetchInvoiceData(page, filters)
            checkIsFilterActive()
        }
    }, [filters, page]);


    return (

        <Box className={cls.InvoicesPage}>
            <Box className={cls.InvoicesPage__container}>
                {/*Пошук та дава створення*/}
                <Box className={cls.searchBlock}>
                    <Box className={cls.searchBlock__inputBlock}>
                        <Input disableUnderline={true} fullWidth={true}
                               className={classNames(cls.searchBlock__inputBlock__input, {active_input: inputFilterByName})}
                               onChange={inputByNumberFilter}
                               value={inputFilterByName}
                               placeholder='Search by wallet 0x2423...'
                               endAdornment={
                                   inputFilterByName && <InputAdornment
                                       onClick={handleClearInput}
                                       sx={{padding: '12px'}}
                                       position="end">
                                       <ClearIcon/>
                                   </InputAdornment>

                               }
                        />
                        <Box className={cls.searchBlock__inputBlock__answer}>
                            {/*<Answer className={cls.searchBlock__inputBlock__img}/>*/}
                            <img className={cls.searchBlock__inputBlock__img} src={'/images/icons/Answer.svg'}/>
                            <Box className={cls.searchBlock__inputBlock__answerBlock}>
                                <Box padding='14px'>
                                    <Typography variant='body2' lineHeight='12px' fontSize='10px'>Вкажіть
                                        номер у встановленому
                                        форматі:</Typography>
                                    <Typography variant='body2' lineHeight='12px' fontSize='10px'>1.
                                        УНТК-ДТ-00001776</Typography>
                                    <Typography variant='body2' lineHeight='12px' fontSize='10px'>2.
                                        УНТК-ТД-ТД00-003143</Typography>
                                    <Typography variant='body2' lineHeight='12px' fontSize='10px'
                                                paddingTop='10px'>Усі літери великі та
                                        кирилицею.</Typography>

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={cls.searchBlock__calendarBlock}>
                        <Box className={cls.searchBlock__calendarBlock__container}>
                            <Input onClick={handleCalendarClick} value={calendarValue}
                                   disableUnderline={true} fullWidth={true} placeholder='Дата створення'
                                   className={classNames(cls.searchBlock__calendarBlock__calendar, {open_inputCalendar: isCalendarOpen})}
                                   endAdornment={
                                       <InputAdornment sx={{padding: '12px'}} position="end">
                                           <img src={'/images/icons/Calendar.svg'}/>
                                       </InputAdornment>

                                   }/>
                            <MyCalendar ref={calendarRef} closeCalendar={closeCalendar}
                                        isOpen={isCalendarOpen}
                                        setFilter={setTimeFilter} setTime={handleSetCalendarValue}
                                        clearTime={handleClearCalendarValue}/>
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
                <Box className={cls.Invoices}>
                    {/*{invoiceData?.meta?.total ?*/}
                    {/*    invoiceData?.data.map(invoice => (*/}
                    {/*        <InvoiceItem key={invoice.id} invoice={invoice}/>*/}
                    {/*    ))*/}
                    {/*    : <ZeroItems/>*/}
                    {/*}*/}
                </Box>
            </Box>
        </Box>

    );
};

export default InvoicesPage;