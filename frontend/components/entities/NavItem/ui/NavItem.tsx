import cls from './NavItem.module.scss'
import {Box, Typography} from "@mui/material"
import {ReactNode, useEffect, useState} from "react";
import {classNames} from "../../../shared/lib/classNames";
import Link from "next/link";
import {useRouter} from "next/router";

interface NavItemProps {
    className?: string;
    children: ReactNode;
    svgIcon: ReactNode;
    url: string;

}

const NavItem = ({className, children, svgIcon, url}: NavItemProps) => {
    const [activeBar, setActiveBar ] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        setActiveBar(Boolean(router.pathname.includes(url)))
    },[router.pathname])

    return (
        <Box className={classNames(cls.NavItem, {active_tab: activeBar}, [className])}>
            <Box className={cls.NavItem__container}>
                <Box height='24px' width='24px'
                     className={classNames(cls.NavItem__container__icon, {active_tab: activeBar})}>
                    {svgIcon}
                </Box>
                <Link style={{textDecoration: 'none'}} href={url}>
                    <Typography variant='h3' fontWeight='400'
                                className={classNames(cls.NavItem__container__title, {active_tab: activeBar}, [])}>
                        {children}
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default NavItem;
