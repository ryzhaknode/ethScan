import {useRouter} from "next/router";
import {truckType} from "../../../types/truckType";
import useSWR, {mutate} from "swr";
import {driverFetcher} from "../../../../api/swr/config/fetchers";

const requestUrl = {
    truck: '/front/vehicle/trucks'
}



const useTruckData = () => {
    const router = useRouter();
    const {data, error, isLoading, isValidating} = useSWR<truckType>(requestUrl.truck, driverFetcher)

    console.log({data, error, isLoading})

    const refreshData = () => {
        mutate(requestUrl.truck);
    };

    if(error){
        if(error.status === 419 || error.status === 401) router.push('/auth')
    }

    return [data, isLoading, isValidating, refreshData] as const;
}

export default useTruckData;