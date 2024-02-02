import cls from '../../components/pages/TransactionsPage/ui/TransactionsPage.module.scss'
import {Box, Button, Input, InputAdornment, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {filtersInInvoice} from "../../components/shared/hooks/requestHooks/useInvoiceData";
import {useNewFilter} from "../../components/shared/hooks/requestHooks/useNewFilter";
import {useThrottlingProtect} from "../../components/shared/hooks/useTrottlingProtect";
import ZeroItems from "../../components/entities/ZeroItems/ui/ZeroItems";
import {getAllTransfer} from "../../components/shared/config/alchemy/functions/getTransactions";
import TransactionItem from "../../components/entities/TransactionItem/ui/TransactionItem";
import {AssetTransfersWithMetadataResult} from "alchemy-sdk";
import {useSelector} from "react-redux";
import {getWalletInfo} from "../../components/app/redux/slices/selectors/addWalletInfoSelectors";


const tabTitles: string[] = ['Hash', 'From', 'Asset', 'Value', 'To'];

const TransactionsPage = () => {
    const walletInfo = useSelector(getWalletInfo)
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
    const [transactions, setTransactions] = useState<AssetTransfersWithMetadataResult[] | null>(null)
    const inputByNumberFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target

        //
        // console.log(result)

        setInputFilterByName(value)

        trottlingHandle(async () => {
            const result = await getAllTransfer(value)
            setTransactions(result)
        }, 300);
    };


    useEffect(() => {

        async function getTranscations() {
            if (walletInfo !== null) {
                const result = await getAllTransfer(walletInfo)
                setTransactions(result)
            }
        }

        getTranscations()

    }, [walletInfo])

    const setTimeFilter = (from: string | null, to: string | null) => {
        setFilters(prev => ({
            ...prev,
            "createdAtFrom": from,
            "createdAtTo": from,

        }))
    };


    return (

        <Box className={cls.TransactionsPage}>
            <Box className={cls.TransactionsPage__container}>

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
            </Box>
        </Box>

    );
};

export default TransactionsPage;