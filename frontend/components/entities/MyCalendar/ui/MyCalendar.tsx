import DatePicker from "react-datepicker";
import {Box, Button} from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {registerLocale} from "react-datepicker";
import uk from 'date-fns/locale/uk';
import {classNames} from "../../../shared/lib/classNames";
import {convertDateToYearMonthDay, formattedDateFunc} from "../../../shared/function/formattedDateFunc";

registerLocale('uk', uk)

interface MyCalendarProps {
    className?: string;
    isOpen: boolean;
    closeCalendar: () => void;
    setFilter: (from: string | null, to: string | null) => void;
    setTime: (from: string, to: string) => void;
    clearTime: () => void;
}


// eslint-disable-next-line react/display-name
const MyCalendar = forwardRef((props: MyCalendarProps, ref: any) => {
    const {className, isOpen, closeCalendar, setFilter, setTime, clearTime} = props
    const [startDate, setStartDate] = useState<null | Date>(new Date());
    const [endDate, setEndDate] = useState<null | Date>(null);
    useImperativeHandle(ref, () => ({
        clearCalendar(){
            handleCleanCalendar()
        }
    }))

    // console.log(formattedDateFunc(startDate))


    const handleCalendarChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    const handleCalendarFilter = async () => {
        if (startDate !== null && endDate !== null) {
            setFilter(convertDateToYearMonthDay(startDate), convertDateToYearMonthDay(endDate))
            setTime(formattedDateFunc(startDate), formattedDateFunc(endDate))
            closeCalendar()
        }
    }

    const handleCleanCalendar = () => {
        setStartDate(null);
        setEndDate(null)
        setFilter(null, null)
        clearTime()
    }

    useEffect(() => {
        console.log(startDate, endDate)
    }, [startDate, endDate])

    return (
        <Box className={classNames('Calendar', {calendar_open: isOpen})}>
            <DatePicker locale='uk' onChange={handleCalendarChange}
                        startDate={startDate}
                        endDate={endDate}
                        selected={startDate}
                        selectsRange
                        inline
            />

            <Box className='Calendar__btnBlock'>
                {endDate && <Button onClick={handleCleanCalendar} variant='info'
                                    className='Calendar__btnBlock__clean'>Очистити</Button>}
                <Button variant='info' sx={{fontWeight: 700, color: endDate ? '#FFC404' : '#ADB5BD'}}
                        onClick={handleCalendarFilter}
                        className='Calendar__btnBlock__filter'>Фільтрувати</Button>
            </Box>

        </Box>
    );
});

export default MyCalendar;