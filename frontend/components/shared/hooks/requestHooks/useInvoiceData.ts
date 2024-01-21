import {useEffect, useState} from 'react';
import {postData} from "../../../../api/api";
import {InvoiceType} from "../../../types/invoiceType";
import {useRouter} from "next/router";

const requestUrl = {
    invoice: '/front/sale-invoice'
}

export type filtersInInvoice = {
    "likeNumber": string | null,
    "createdAtFrom": string | null,
    "createdAtTo":string |  null
}


const useInvoiceData = () => {
    const [invoiceData, setInvoiceData] = useState<InvoiceType | undefined>(undefined);
    const router = useRouter();
    // const [pageLoading, setPageLoading ] = useState(false)
    async function getUserData(page?: number, filter?: filtersInInvoice) {
        // setPageLoading(true)
        const res: any = await postData(requestUrl.invoice, {
            "page": page ?? 1,
            "column": "created_at",
            "direction": "desc",
            "perPage": 20,
            "search": "",
            "filters": {
                "likeNumber": filter?.likeNumber,
                "createdAtFrom": filter?.createdAtFrom,
                "createdAtTo": filter?.createdAtTo
            }
        });
        // setPageLoading(false)

        if(res?.response?.status === 419 || res?.response?.status === 401) router.push('/auth')

        if (res?.status === 200) setInvoiceData(res?.data)
    }


    useEffect(() => {
        if(invoiceData === undefined) getUserData();
    }, []);

    return [invoiceData, getUserData] as const;
}

export default useInvoiceData;