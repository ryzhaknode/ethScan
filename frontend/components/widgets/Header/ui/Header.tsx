import cls from './Header.module.scss'
import {Box, Typography} from "@mui/material";
import {classNames} from "../../../shared/lib/classNames";
import {UserLogo} from "../../../shared/ui/UserLogo/UserLogo";
import {MyArrow} from "../../../shared/ui/Arrow/Arrow";
import Exit from "../../../../public/images/icons/Exit.svg"
import {useState} from "react";
import {postData} from "../../../../api/api";
import {useRouter} from "next/router";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {addUserInfo, cleanUserInfo} from "../../../app/redux/slices/addNameSlice";

interface HeaderProps {
    className?: string;
    name: string | undefined;
}

const requestUrl = {
    logout: '/logout'
}

const Header = ({className, name}: HeaderProps) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const [isArrowOpen, setIsArrowOpen] = useState(false)

    const handleLogout = async () => {
        const res = await postData(requestUrl.logout, {})
        console.log(res)
        if (res?.status === 204) {
            dispatch(cleanUserInfo())
            router.push('/auth')
        }
    }

    const handleArrowClick = () => {
        setIsArrowOpen(prevState => !prevState)
    }
    return (
        <Box className={classNames(cls.Header, {}, [className])}>
            <Box className={cls.Header__content} padding='22px'>
                <Link href={'/account'} className={cls.Header__user}>
                    <UserLogo className={cls.Header__user__logo}/>
                    <Typography className={cls.Header__user__name} variant='h3'>{name}</Typography>
                </Link>
                <MyArrow onClick={handleArrowClick}
                         className={classNames(cls.Header__content__arrow, {arrow_open: isArrowOpen ? true : false})}
                         color={isArrowOpen ? '#FFC404' : '#141414'}/>
            </Box>
            <Box className={classNames(cls.Header__Exit, {exit_open: isArrowOpen ? true : false})}>
                <Box onClick={handleLogout} className={cls.Header__Exit__content}>
                    <Exit/>
                    <Typography variant='h5'>Вийти</Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default Header;
