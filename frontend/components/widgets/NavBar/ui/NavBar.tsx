import cls from './NavBar.module.scss';
import {Box} from "@mui/material";
import NavItem from "../../../entities/NavItem/ui/NavItem";
import {classNames} from "../../../shared/lib/classNames";
import {navItemList} from "../../../shared/config/NavItemList";
import {useState} from "react";


interface NavBarProps {
    className?: string;
}

const NavBar = ({className}: NavBarProps) => {
    const [activeBar, setActiveBar ] = useState(null)
    return (
        <Box className={classNames(cls.NavBar, {}, [className])}>
            <Box className={cls.Logo}>
                <img className={cls.Logo__img} style={{filter: 'invert(100%)'}} src='/images/untk_logo.svg'
                     alt={'logo'}/>
            </Box>
            <Box className={cls.Nav}>
                <Box className={cls.Nav__menu}>
                    {navItemList.map(({title, icon, url}) => <NavItem url={url} key={title} svgIcon={icon}>{title}</NavItem>)}
                </Box>

            </Box>
        </Box>
    );
};

export default NavBar;
