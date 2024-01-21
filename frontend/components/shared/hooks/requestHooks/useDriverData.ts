import {useEffect, useState} from 'react';
import {postData} from "../../../../api/api";
import {useRouter} from "next/router";
import {driverType} from "../../../types/driverType";
import useSWR, {mutate} from "swr";
import {driverFetcher} from "../../../../api/swr/config/fetchers";

const requestUrl = {
    driver: '/front/driver'
}



const useDriverData = () => {
    const router = useRouter();
    const {data, error, isLoading, isValidating} = useSWR<driverType>(requestUrl.driver, driverFetcher)

    console.log({data, error, isLoading})

    const refreshData = () => {
        mutate(requestUrl.driver);
    };

    if(error){
        if(error.status === 419 || error.status === 401) router.push('/auth')
    }

    return [data, isLoading, isValidating, refreshData] as const;
}

export default useDriverData;