import cls from '../../components/pages/PortfolioPage/ui/PortfolioPage.module.scss'
import {Box, Button, Input, InputAdornment, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import ZeroItems from "../../components/entities/ZeroItems/ui/ZeroItems";
import {useSelector} from "react-redux";
import {getWalletInfo} from "../../components/app/redux/slices/selectors/addWalletInfoSelectors";
import {alchemy} from "../../components/shared/config/alchemy";
import {BalanceTokenType} from "../../components/types/balanceTokenType";
import BalanceItem from "../../components/entities/BalanceItem/ui/BalanceItem";


const tabTitles: string[] = [ 'Name', 'Balance', 'Symbol'];

const PortfolioPage = () => {
    const walletInfo = useSelector(getWalletInfo)
    const [tokenBalances, setTokenBalances] = useState<Array<BalanceTokenType> | null>(null)


    useEffect(() => {

        async function getTokenBalances() {
            if (walletInfo !== null) {
                const balances = await alchemy.core.getTokenBalances(walletInfo);

                const nonZeroBalances = balances.tokenBalances.filter((token) => {
                    return token.tokenBalance !== "0";
                });


                let i = 1;

                const promises = nonZeroBalances.map(async (token, index) => {
                    let balance: string | null | number = token.tokenBalance;
                    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
                    // @ts-ignore
                    balance = balance / Math.pow(10, metadata.decimals);
                    balance = balance.toFixed(2);

                    return {
                        name: metadata.name,
                        balance: +balance, // Convert balance to number
                        symbol: metadata.symbol
                    };
                });

                const results = await Promise.all(promises);
                console.log(results);

                if (results !== null) {
                    // const sortedFromStart = results.sort((a, b) => a.number - b.number)
                    const tokenWithNoZeroBalance = results.filter(tokenBalance => tokenBalance.balance > 0.01)
                    setTokenBalances(tokenWithNoZeroBalance)
                }
            }
        }

        getTokenBalances()

    }, [walletInfo])


    return (

        <Box className={cls.PortfolioPage}>
            <Box className={cls.PortfolioPage__container}>

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


                <Box className={cls.TokenBalances}>

                    {tokenBalances === null
                        ?
                        <ZeroItems/>
                        :
                        tokenBalances.map((tokenBalance, index) => (
                            <BalanceItem key={index} balanceToken={tokenBalance}/>
                        ))
                    }
                </Box>
            </Box>
        </Box>

    );
};

export default PortfolioPage;