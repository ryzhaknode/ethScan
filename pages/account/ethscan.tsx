import cls from '../../components/pages/EthScanPage/ui/EthScanPage.module.scss'
import {Box, Input, InputAdornment, Typography} from "@mui/material";
import {useRef, useState} from "react";
import {classNames} from "../../components/shared/lib/classNames";
import {useThrottlingProtect} from "../../components/shared/hooks/useTrottlingProtect";
import ZeroItems from "../../components/entities/ZeroItems/ui/ZeroItems";
import ClearIcon from '@mui/icons-material/Clear';
import MyLoading from "../../components/shared/ui/MyLoading/MyLoading";
import TransactionItem from "../../components/entities/TransactionItem/ui/TransactionItem";
import {AssetTransfersWithMetadataResult} from "alchemy-sdk";
import {getAllTransfer} from "../../components/shared/config/alchemy/functions/getAllTransfer/getAllTransfer";


const tabTitles: string[] = ['Hash', 'From', 'Asset', 'Value', 'To'];

const TransactionsPage = () => {
    const [inputFilterByName, setInputFilterByName] = useState<string>("");
    const trottlingHandle = useThrottlingProtect();
    const [transactions, setTransactions] = useState<AssetTransfersWithMetadataResult[] | null>(null)
    const [loading, setLoading] = useState(false)
    const inputByNumberFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setInputFilterByName(value);
        trottlingHandle(async () => {
            setLoading(true)
            const result = await getAllTransfer(value)
            setTransactions(result)
            setLoading(false)
        }, 300);
    };


    const handleClearInput = () => {
        setInputFilterByName('')
        setTransactions(null)
    };


    return (

        <Box className={cls.EthScanPage}>
            <Box className={cls.EthScanPage__container}>


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

                            <img className={cls.searchBlock__inputBlock__img} src={'/images/icons/Answer.svg'}/>
                            <Box className={cls.searchBlock__inputBlock__answerBlock}>
                                <Box padding='14px'>
                                    <Typography variant='body2' lineHeight='12px' fontSize='10px'>Set up wallet address</Typography>
                                    <Typography variant='body2' lineHeight='12px' fontSize='10px'>and you will receive information</Typography>
                                    <Typography variant='body2' lineHeight='12px' fontSize='10px'>about all Ethereum transactions.</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

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

                {loading ?
                    <MyLoading big={true}/>
                    :

                    <Box className={cls.Transactions}>

                        {transactions === null
                            ?
                            <ZeroItems/>
                            :
                            transactions.map((ts, index) => (
                                <TransactionItem key={index} transaction={ts}/>
                            ))
                        }
                    </Box>
                }
            </Box>
        </Box>

    );
};

export default TransactionsPage;