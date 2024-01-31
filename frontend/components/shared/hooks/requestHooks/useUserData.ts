import {useEffect} from 'react';
import {getData} from "../../../../api/api";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../../app/redux/slices/selectors/addWalletInfoSelectors";
import {addUserInfo} from "../../../app/redux/slices/addWalletSlice";

const requestUrl = {
    user: '/front/profile/user'
}


const useUserData = () => {
    const router = useRouter();
    const userInfo = useSelector(getUserInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo.name === "") getUserData();
        async function getUserData() {
            const res:any = await getData(requestUrl.user);
            console.log(res);

            if(res?.response?.status === 419 || res?.response?.status === 401) router.push('/auth')

            if (res?.status === 200){
                dispatch(addUserInfo(res?.data))
            }
        }
    }, []);
}

export default useUserData;