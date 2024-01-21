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

export type InvoiceType = {
    data: Array<InvoiceItem>,
    links: Object,
    meta: MetaInInvoice
}

export type InvoiceItem = {
    amount: string,
    base: string,
    created_at: string,
    deleted_at: null,
    egrpou: string,
    files: any,
    fuel: string,
    fuelString?: string,
    guid: string,
    id: number,
    number: string,
    state: string,
    updated_at: string,
    volume: string,
}
