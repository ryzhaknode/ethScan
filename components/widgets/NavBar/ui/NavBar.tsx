import cls from './NavBar.module.scss';
import {Box} from "@mui/material";
import {classNames} from "../../../shared/lib/classNames";
import NavItem from "../../../entities/NavItem/ui/NavItem";
import {navItemList} from "../../../shared/config/NavItemList";
import Image from "next/image";


interface NavBarProps {
    className?: string;
}

const NavBar = ({className}: NavBarProps) => {

    return (
        <Box className={classNames(cls.NavBar, {}, [className])}>
            <Box className={cls.Logo}>
                <Image className={cls.Logo__img} width={60} height={60} src='/images/logoEth.png'
                     alt={'logo'}/>
            </Box>
            <Box className={cls.Nav}>
                <Box className={cls.Nav__menu}>
                    {navItemList.map(({title, imageSrc, url}) => <NavItem url={url} key={title} imageSrc={imageSrc}>{title}</NavItem>)}
                </Box>

            </Box>
        </Box>
    );
};

export default NavBar;
