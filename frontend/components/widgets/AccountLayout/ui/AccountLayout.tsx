import cls from './AccountLayout.module.scss'
import {classNames} from "../../../shared/lib/classNames";
import {ReactNode, useEffect} from "react";
import {Box, Container} from "@mui/material";
import NavBar from "../../NavBar/ui/NavBar";
import Header from "../../Header/ui/Header";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {getUserInfo} from "../../../app/redux/slices/selectors/addUserInfoSelectors";
import useUserData from "../../../shared/hooks/requestHooks/useUserData";

interface AccountLayoutProps {
    className?: string;
    children: ReactNode;
}

const AccountLayout = ({className, children}: AccountLayoutProps) => {
    useUserData()
    const router = useRouter();
    const userInfo = useSelector(getUserInfo)

    //змінюю backgroudcolor для сторінки /account
    useEffect(() => {
        const originalBackground = document.body.style.background;
        const backgroundColor = router.pathname.split('/').length === 2 ? '#F6F6FF' : '#F5F5F5'
        document.body.style.background = backgroundColor;
        return () => {
            document.body.style.background = originalBackground;
        };
    }, [router]);

    return (
        <Container disableGutters maxWidth="lg">
            <Box className={classNames(cls.AccountLayout, {}, [className])}>
                <NavBar/>
                <Box className={cls.MainBlock}>
                    <Header name={userInfo.name}/>
                    {children}
                </Box>
            </Box>
        </Container>
    );
};

export default AccountLayout;