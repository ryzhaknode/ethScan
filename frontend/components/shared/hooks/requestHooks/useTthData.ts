import {useEffect, useState} from 'react';
import {postData} from "../../../../api/api";
import {TtnType} from "../../../types/TtnType";
import {useRouter} from "next/router";

const requestUrl = {
    ttn: '/front/ttn'
}


export type filtersInTtn = {
    "likeNumber": string | null,
    "createdAtFrom": string | null,
    "createdAtTo":string |  null,
    "truckNumber": string |  null,
    "trailerNumber": string |  null,
    "driverFullName": string |  null,
}

const useTtnData = () => {
    const [tthData, setTthData] = useState<TtnType | undefined>(undefined)
    const router = useRouter();
    async function getUserData(page?: number, filter?: filtersInTtn) {
        const res: any = await postData(requestUrl.ttn, {
            "page": page ?? 1,
            "column": "created_at",
            "direction": "desc",
            "perPage": 20,
            "search": "",
            "filters": {
                "likeNumber": filter?.likeNumber,
                "createdAtFrom": filter?.createdAtFrom,
                "createdAtTo": filter?.createdAtTo,
                "truckNumber": filter?.truckNumber,
                "trailerNumber": filter?.trailerNumber,
                "driverFullName": filter?.driverFullName,
            }
        });


        if(res?.response?.status === 419 || res?.response?.status === 401) router.push('/auth')

        if (res?.status === 200) setTthData(res?.data)
    }
    
    useEffect(() => {
        if(tthData === undefined) getUserData();
    }, []);

    return [tthData, getUserData] as const;
}

export default useTtnData;