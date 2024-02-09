import cls from './Header.module.scss'
import {Box, Typography} from "@mui/material";
import {classNames} from "../../../shared/lib/classNames";
import {MyArrow} from "../../../shared/ui/Arrow/Arrow";
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {
    addWalletInfo,
    addWalletLastHash,
    addWalletValue,
    cleanUserInfo
} from "../../../app/redux/slices/addWalletSlice";
import WalletIcon from '@mui/icons-material/Wallet';
import {ethers} from "ethers";
import {getWalletInfo} from "../../../app/redux/slices/selectors/addWalletInfoSelectors";
import useClickOutside from "../../../shared/hooks/useClickOutside";
import {alchemy} from "../../../shared/config/alchemy";
import Link from "next/link";
import {getLastTransfer} from "../../../shared/config/alchemy/functions/getLastTransfer/getTransactions";

interface HeaderProps {
    className?: string;
}


const Header = ({className}: HeaderProps) => {


    const router = useRouter();
    const dispatch = useDispatch()
    const walletInfo = useSelector(getWalletInfo)
    const excludeRef = useRef<HTMLDivElement | null>(null)
    const [isArrowOpen, setIsArrowOpen, exitRef] = useClickOutside(excludeRef)
    const handleLogout = () => {
        setIsArrowOpen(false)
        dispatch(cleanUserInfo())
    }

    const handleArrowClick = () => {
        setIsArrowOpen(prevState => !prevState)
    }


    async function setEthValue(provider: ethers.BrowserProvider, adress: string) {
        const balance = await provider.getBalance(adress)
        const balanceEther = ethers.formatEther(balance);

        dispatch(addWalletValue(+balanceEther))
        // return balanceEther
    }


    async function connectMetamask() {
        try {
            console.log(window.ethereum)
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Request account access and get the provider
                await window.ethereum.request({method: 'eth_requestAccounts'});

                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner();
                const connectedAddress = await signer.getAddress()

                dispatch(addWalletLastHash(await getLastTransfer(connectedAddress)))
                dispatch(addWalletInfo(connectedAddress))
                setEthValue(provider, connectedAddress)

            } else {
                alert('Please download MetaMask');
            }
        } catch (error: any) {
            console.error('Error connecting MetaMask:', error.message);
        }
    }

    return (
        <Box className={classNames(cls.Header, {}, [className])}>
            <Box className={cls.Header__content} padding='22px'>
                {/*<Link href={'/account'} className={cls.Header__user}>*/}
                {/*    <UserLogo className={cls.Header__user__logo}/>*/}
                {/*    <Typography className={cls.Header__user__name} variant='h3'>Den</Typography>*/}
                {/*</Link>*/}
                {!walletInfo ?
                    <Box className={cls.Header__user} onClick={connectMetamask}>
                        <WalletIcon className={cls.Header__user__logo}/>
                        <Typography className={cls.Header__user__name} variant='h3'>Connect wallet</Typography>
                    </Box>
                    :
                    <Link className={cls.Header__user} href={'/account'}>
                        <Box className={cls.Header__user}>
                            <WalletIcon className={cls.Header__user__logo}/>
                            <Typography className={cls.Header__user__name}
                                        variant='h3'>{`${walletInfo.slice(0, 10)}...`}</Typography>
                        </Box>
                    </Link>
                }

                <Box ref={excludeRef}>
                    <MyArrow onClick={handleArrowClick}
                             className={classNames(cls.Header__content__arrow, {arrow_open: isArrowOpen ? true : false})}
                             color={isArrowOpen ? '#FFC404' : '#141414'}/>
                </Box>
            </Box>
            <Box ref={exitRef} className={classNames(cls.Header__Exit, {exit_open: isArrowOpen ? true : false})}>
                <Box onClick={handleLogout} className={cls.Header__Exit__content}>
                    <img src='/images/icons/Exit.svg'/>
                    <Typography variant='body1'>Log out</Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default Header;
