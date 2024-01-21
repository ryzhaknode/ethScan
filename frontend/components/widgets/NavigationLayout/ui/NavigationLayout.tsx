import cls from './NavigationLayout.module.scss'
import {ReactNode, useEffect} from "react";
import Router from 'next/router';
import Navigation from "../../../entities/Navigation/ui/Navigation";
import {Box} from "@mui/material";
import {useDispatch} from "react-redux";
import {hidePopup} from "../../../app/redux/slices/openPopupSlice";

interface NavigationLayoutProps {
    className?: string;
    children: ReactNode;
    title?: string;
    total?: number;
    from?: number;
    to?: number;
    setPage: React.Dispatch<React.SetStateAction< number>>;
}

const NavigationLayout = ({className, children, title, total, from, to, setPage}: NavigationLayoutProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleRouteChange = () => {
            dispatch(hidePopup());
        };

        // Підписатися на події зміни маршруту
        Router.events.on('routeChangeStart', handleRouteChange);

        // Очистити підписку, коли компонент розмонтовується
        return () => {
            Router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [dispatch]);

    return (
        <Box className={cls.NavigationLayout}>
            <Navigation title={title} total={total} from={from} to={to} setPage={setPage}/>
            {children}
        </Box>
    );
};

export default NavigationLayout;