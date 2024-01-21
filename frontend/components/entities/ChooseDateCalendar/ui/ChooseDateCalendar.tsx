import DatePicker from "react-datepicker";
import {Box, Button} from "@mui/material";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {registerLocale} from "react-datepicker";
import uk from 'date-fns/locale/uk';
import {classNames} from "../../../shared/lib/classNames";
import {convertDateToYearMonthDay, formattedDateFunc} from "../../../shared/function/formattedDateFunc";

registerLocale('uk', uk)

interface ChooseCalendarProps {
    className?: string;
    isOpen: boolean;
    closeCalendar: () => void;
    setTime: (selectedTime: string) => void;
    clearTime: () => void;
    position?: boolean;
    checkMinDate?: boolean;
}


// eslint-disable-next-line react/display-name
const ChooseDateCalendar = forwardRef((props: ChooseCalendarProps, ref: any) => {
    const calendarRef = useRef(null);
    const {
        className,
        isOpen,
        closeCalendar,
        position = false,
        setTime,
        clearTime,
        checkMinDate = false
    } = props
    const [selectedDate, setSelectedDate] = useState<null | Date>(new Date());

    useImperativeHandle(ref, () => ({
        clearCalendar() {
            handleCleanCalendar()
        }
    }))



    const handleCalendarChange = (date: any) => {
        setSelectedDate(date)

        if (date !== null) {
            setTime(formattedDateFunc(date))
        }

        closeCalendar()

    };


    // const handleCalendarFilter = async () => {
    //     if (selectedDate !== null) {
    //         setTime(formattedDateFunc(selectedDate))
    //     }
    // }

    const handleCleanCalendar = () => {
        setSelectedDate(null)
        clearTime()
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // @ts-ignore
            if (calendarRef.current && !calendarRef.current?.contains(event.target as Node)) {
                closeCalendar()
            }
        };
        // Додаємо прослуховування кліків
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Прибираємо прослуховування кліків
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Box ref={calendarRef} className={classNames('ChooseCalendar', {calendar_open: isOpen, calendar_positionTop: position})}>
            <DatePicker locale='uk' onChange={handleCalendarChange} selected={selectedDate} inline minDate={checkMinDate ? new Date() : null}/>

            {/*<Box className='ChooseCalendar__btnBlock'>*/}
            {/*    {selectedDate && <Button onClick={handleCleanCalendar} variant='info'*/}
            {/*                             className='Calendar__btnBlock__clean'>Очистити</Button>}*/}
            {/*    <Button*/}
            {/*        variant='info'*/}
            {/*        sx={{fontWeight: 700, color: selectedDate ? '#FFC404' : '#ADB5BD'}}*/}
            {/*        onClick={handleCalendarFilter}*/}
            {/*        className='ChooseCalendar__btnBlock__filter'>Фільтрувати</Button>*/}
            {/*</Box>*/}

        </Box>
    );
});

export default ChooseDateCalendar;