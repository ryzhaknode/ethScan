import {useEffect, useState} from "react";
import {postData} from "../../../../api/api";


export const useGetItemById = <T extends {}>(link: string) => {

    console.log(link)
    const [item, setItem] = useState<T | null>(null);

    async function getItem() {
        if (link !== undefined) {
            const res = await postData(link, {})
            setItem(res?.data)
        }
    }

    useEffect(() => {
        getItem()
    }, [link])

    return [item, setItem] as const;
}