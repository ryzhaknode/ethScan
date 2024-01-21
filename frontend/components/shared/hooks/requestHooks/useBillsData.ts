import {useEffect, useState} from 'react';
import {postData} from "../../../../api/api";
import {InvoiceType} from "../../../types/invoiceType";
import {useRouter} from "next/router";
import {BillsType} from "../../../types/billsType";

const requestUrl = {
    invoice: '/front/invoice'
}

export type filtersInBills = {
    "likeNumber": string | null,
    "createdAtFrom": string | null,
    "createdAtTo":string |  null,
    "shipmentBase": string |  null,
}


const useBillsData = () => {
    const [invoiceData, setInvoiceData] = useState<BillsType | undefined>(undefined);
    const router = useRouter();
    // const [pageLoading, setPageLoading ] = useState(false)
    async function getUserData(page?: number, filter?: filtersInBills) {
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
                "createdAtTo": filter?.createdAtTo,
                "shipmentBase":  filter?.shipmentBase
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

export default useBillsData;