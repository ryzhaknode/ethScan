import {useRouter} from "next/router";
import useSWR, {mutate} from "swr";
import {driverFetcher} from "../../../../api/swr/config/fetchers";
import {trailerType} from "../../../types/trailerType";

const requestUrl = {
    trailer: '/front/vehicle/trailers'
}


const useTrailerData = () => {
    const router = useRouter();
    const {data, error, isLoading, isValidating} = useSWR<trailerType>(requestUrl.trailer, driverFetcher);

    console.log({data, error, isLoading});

    // Ця функція викликає повторне виконання запиту
    const refreshData = () => {
        mutate(requestUrl.trailer);
    };

    if (error) {
        if (error.status === 419 || error.status === 401) router.push('/auth');
    }

    return [data, isLoading, isValidating, refreshData] as const;
};

export default useTrailerData;