import {InvoiceItem} from "./invoiceType";

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

export type driverType = {
    data: Array<driverItem>,
    links: Object,
    meta: MetaInInvoice
}


export type driverItem = {
    address: any,
    created_at: string,
    dateadrstart: any,
    dateadrstop: any,
    dateb: any,
    deleted_at: any,
    driverLicense: string,
    firstName: string,
    guid: string,
    id: number,
    idCard: boolean,
    ipn: any,
    lastName: string,
    licdatestart: any,
    licdatestop: any,
    middleName: string,
    name: string,
    nameeng: any,
    numberadr: any,
    passdate: any,
    passportDate: string,
    passportNumber: string,
    passportSeries: any,
    passportWhoGave: string,
    passportint: any,
    phone: string,
    rejectedReason: any,
    status: string,
    type: string,
    updated_at: string,
}