import {postData} from "../../api";

export const driverFetcher = async (url:string) => {
    const res = await postData(url, {
        "page": 1,
        "column": "created_at",
        "direction": "desc",
        "perPage": 20
    })

    console.log(res)

    if (res.status !== 200) {
        const error = new Error(res?.response?.message)
        // Добавление дополнительной информации в объект ошибки.
        // @ts-ignore
        error.info = res?.response?.data
        // @ts-ignore
        error.status = res?.response?.status

        throw error
    }

    return res?.data


}
