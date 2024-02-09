import cls from '../../components/pages/AccountPage/ui/AccountPage.module.scss'
import {Box, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {
    getWalletInfo,
    getWalletLashHash,
    getWalletValue
} from "../../components/app/redux/slices/selectors/addWalletInfoSelectors";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const emptyString = '..............'

const AccountPage = () => {
    const walletInfo = useSelector(getWalletInfo)
    const walletValue = useSelector(getWalletValue)
    const walletLashHash = useSelector(getWalletLashHash)


    return (
        <Box className={cls.AccountPage}>
            <Typography paddingLeft='20px' variant='h2'>WALLET INFO</Typography>
            <Box className={cls.InfoBlock}>
                <Box className={cls.InfoBlock__container}>
                    <Box className={cls.InfoBlock__content}>
                        <Box className={cls.InfoBlock__content__infoContainer}>
                            <Box className={cls.InfoBlock__content__infoContainer__information}>
                                <Typography
                                    className={cls.InfoBlock__content__infoContainer__title}
                                    variant='h4'
                                >Wallet:</Typography>
                                <Typography
                                    className={cls.InfoBlock__content__infoContainer__info}
                                    variant='body1'>{walletInfo ? walletInfo : emptyString}</Typography>
                            </Box>
                            <Box className={cls.InfoBlock__content__infoContainer__information}>
                                <Typography
                                    className={cls.InfoBlock__content__infoContainer__title}
                                    variant='h4'
                                >Value:</Typography>
                                <Typography className={cls.InfoBlock__content__infoContainer__info}
                                            variant='body1'>{walletValue ? `${walletValue?.toFixed(4)} ETH` : emptyString} </Typography>
                            </Box>
                            <Box className={cls.InfoBlock__content__infoContainer__information}>
                                <Typography
                                    className={cls.InfoBlock__content__infoContainer__title}
                                    variant='h4'
                                >Last transaction hash:</Typography>
                                <Typography className={cls.InfoBlock__content__infoContainer__info}
                                            variant='body1'>{walletLashHash ? walletLashHash : emptyString}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>


            </Box>
        </Box>
    );
};

export default AccountPage;
