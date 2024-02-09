import cls from '../../components/pages/ScreenerPage/ui/ScreenerPage.module.scss'
import {Box, Button, Input, InputAdornment, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {classNames} from "../../components/shared/lib/classNames";
import {useThrottlingProtect} from "../../components/shared/hooks/useTrottlingProtect";
import ZeroItems from "../../components/entities/ZeroItems/ui/ZeroItems";
import ClearIcon from '@mui/icons-material/Clear';
import MyLoading from "../../components/shared/ui/MyLoading/MyLoading";
import {checkForNewTransfers, tokenAdress} from "../../components/shared/config/alchemy/functions/screenNewTransaction";
import ScreenerTransactionItem from "../../components/entities/ScreenerTransactionItem/ui/ScreenerTransactionItem";

const tabTitles: string[] = ['From', 'Value', 'Asset', 'To', 'Hash'];


export type transferType = {
    sender: string,
    recipient: string,
    amount: number,
    // tokenName: string,
    transactionHash: string,
}


const ScreenerPage = () => {
    const [inputValueByName, setInputValueByName] = useState<string>("");
    const [selectedButton, setSelectedButton] = useState("")
    const intervalRef = useRef<any>(null)
    const [transfers, setTransfers] = useState<Array<transferType>>([]);
    const [loading, setLoading] = useState(false)


    const inputByNumberFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setSelectedButton("")
        clearTransactions()

        const {value} = e.target
        const filteredValue = value.replace(/[^\d]/g, '');
        setInputValueByName(filteredValue);

    };


    const handleSelectBtn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const {name} = event.target as HTMLButtonElement;
        setSelectedButton(name)

        clearTransactions()

        if (tokenAdress[name as keyof typeof tokenAdress]) {
            intervalRef.current = setInterval(async () => {
                setLoading(true)
                const newTransaction: transferType = await checkForNewTransfers(tokenAdress[name as keyof typeof tokenAdress], Number(inputValueByName))

                if (newTransaction) {
                    setTransfers(prevTransfers => {
                        const isTheSame = prevTransfers.some(
                            tr => tr.transactionHash === newTransaction.transactionHash
                        );

                        if (isTheSame) return prevTransfers;

                        return [...prevTransfers, newTransaction];
                    });
                    setLoading(false)
                }
                setLoading(false)
            }, 5000)

        }


    }

    function clearTransactions() {
        setTransfers([])

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }


    function clearInputValue() {
        setInputValueByName("")
        setSelectedButton("")
        clearTransactions()
    }


    return (

        <Box className={cls.ScreenerPage}>
            <Box className={cls.ScreenerPage__container}>
                <Box className={cls.searchBlock}>
                    <Box className={cls.searchBlock__inputBlock}>
                        <Input disableUnderline={true} fullWidth={true}
                               className={classNames(cls.searchBlock__inputBlock__input, {active_input: inputValueByName})}
                               onChange={inputByNumberFilter}
                               value={inputValueByName}
                               placeholder='default value is 10000'
                               endAdornment={
                                   inputValueByName && <InputAdornment
                                       onClick={clearInputValue}
                                       sx={{padding: '12px', cursor: 'pointer'}}
                                       position="end">
                                       <ClearIcon/>
                                   </InputAdornment>

                               }
                        />
                        <Box className={cls.searchBlock__inputBlock__answer}>
                            <img className={cls.searchBlock__inputBlock__img} src={'/images/icons/Answer.svg'}/>
                            <Box className={cls.searchBlock__inputBlock__answerBlock}>
                                <Box padding='14px'>
                                    <Typography variant='body2' lineHeight='12px' fontSize='10px'>1 - Set a minimum
                                        value</Typography>
                                    <Typography variant='body2' lineHeight='12px' fontSize='10px'
                                                paddingBottom={'10px'}>2 - Select the token you want to
                                        track</Typography>
                                    <Typography variant='body2' lineHeight='12px' fontSize='10px'>and you will receive
                                        new transactions from the Ethereum blockchain for the selected
                                        token.</Typography>

                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {loading && <MyLoading/>}
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