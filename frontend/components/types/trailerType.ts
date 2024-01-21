type MetaInInvoice = {
    current_page: number,
    from: number,
    last_page: number,
    links: Array<Object>,
    path: string,
    per_page: number,
    to: number,
    total: number,
}

export type trailerType = {
    data: Array<trailerItem>,
    links: Object,
    meta: MetaInInvoice
}


export type trailerItem = {
    tarpass: string,
    volume: string,
    brand:string,
    checkdate:string,
    created_at:string,
    datestopsv:string,
    deleted_at:any,
    dopdate:string,
    guid:string,
    height:number,
    id:number,
    length:number,
    model:string,
    tarissue: string,
    tardate: string,
    number:string,
    numbercheck:string,
    numberdop:string,
    numbersv:string,
    numbertype:string,
    protocol:string,
    protocolsv:string,
    rejectedReason:any,
    section:string,
    sections: Array<any>,
    status:string,
    type:string,
    updated_at:string,
    weight:number,
    width:number,
}