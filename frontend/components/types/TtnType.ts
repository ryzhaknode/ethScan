type MetaInTtn = {
    current_page: number,
    from: number,
    last_page: number,
    links: Array<Object>,
    path: string,
    per_page: number,
    to: number,
    total: number,
}

export type TtnType = {
    data: Array<TtnItem>,
    links: Object,
    meta: MetaInTtn
}

export type TtnItem = {
    created_at: string,
    deleted_at: null,
    egrpou: string,
    fuel: string,
    fuelString?: string,
    guid: string,
    driverFullName:string,
    files: Object,
    id:number,
    number:string,
    trailerNumber:string,
    truckNumber:string,
    updated_at:string,
    volume:string,
}