import cls from '../../components/pages/ScreenerPage/ui/ScreenerPage.module.scss'
import {Box, Button, Input, InputAdornment, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {classNames} from "../../components/shared/lib/classNames";
import {useThrottlingProtect} from "../../components/shared/hooks/useTrottlingProtect";
import ZeroItems from "../../components/entities/ZeroItems/ui/ZeroItems";
import ClearIcon from '@mui/icons-material/Clear';
import MyLoading from "../../components/shared/ui/MyLoading/MyLoading";
import EmptyPage from "../../components/widgets/EmptyPage/ui/EmptyPage";
import {checkForNewTransfers, tokenAdress} from "../../components/shared/config/alchemy/functions/screenNewTransaction";
import ScreenerTransactionItem from "../../components/entities/ScreenerTransactionItem/ui/ScreenerTransactionItem";

const tabTitles: string[] = ['From', 'Value',  'Asset', 'To', 'Hash'];


export type transferType = {
    sender: string,
    recipient: string,
    amount: number,
    // tokenName: string,
    transactionHash: string,
}


const ScreenerPage = () => {
    const [inputFilterByName, setInputFilterByName] = useState<string>("");
    const trottlingHandle = useThrottlingProtect();
    const [selectedButton, setSelectedButton] = useState("")
    const intervalRef = useRef<any>(null)
    const [transfers, setTransfers] = useState<Array<transferType>>([]);
    const inputByNumberFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target

        setInputFilterByName(value)

    };



    const handleSelectBtn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const {name} = event.target as HTMLButtonElement;
        setSelectedButton(name)

        setTransfers([])

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        if (tokenAdress[name as keyof typeof tokenAdress]) {
            intervalRef.current = setInterval(async () => {
                const newTransaction: transferType = await checkForNewTransfers(tokenAdress[name as keyof typeof tokenAdress])

                if (newTransaction) {
                    setTransfers(prevTransfers => {
                        const isTheSame = prevTransfers.some(
                            tr => tr.transactionHash === newTransaction.transactionHash
                        );

                        if (isTheSame) return prevTransfers;

                        return [...prevTransfers, newTransaction];
                    });
                }
                console.log(newTransaction)
            }, 5000)

        }


    }



    return (

        <Box className={cls.ScreenerPage}>
            <Box className={cls.ScreenerPage__container}>
                {/*Пошук та дава створення*/}
                <Box className={cls.searchBlock}>
                    <Box className={cls.searchBlock__inputBlock}>
                        <Input disableUnderline={true} fullWidth={true}
                               className={classNames(cls.searchBlock__inputBlock__input, {active_input: inputFilterByName})}
                               onChange={inputByNumberFilter}
                               value={inputFilterByName}
                               placeholder='Input value'
                               endAdornment={
                                   inputFilterByName && <InputAdornment
                                       // onClick={handleClearInput}
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

                    <Box className={cls.searchBlock__selectBtn}>
                        <Button className={cls.searchBlock__selectBtn__btn}
                                name='usdt'
                                onClick={handleSelectBtn}
                                fullWidth={true}
                                variant={selectedButton === 'usdt' ? 'outlined' : 'contained'}>USDT</Button>
                        <Button className={cls.searchBlock__selectBtn__btn} name='usdc' onClick={handleSelectBtn}
                                fullWidth={true}
                                variant={selectedButton === 'usdc' ? 'outlined' : 'contained'}>USDC</Button>
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
                <Box className={cls.Transactions}>

                    {transfers.length < 1
                        ?
                        <ZeroItems/>
                        :
                        transfers.map((ts, index) => (
                            <ScreenerTransactionItem key={index} transaction={ts} token={selectedButton}/>
                        ))
                    }

                </Box>
            </Box>
        </Box>

    );
};

export default ScreenerPage;