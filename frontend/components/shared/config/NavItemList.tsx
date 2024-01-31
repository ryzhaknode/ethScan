
interface itemValues {
    title: string;
    imageSrc: string;
    url: string
}

export const navItemList: itemValues[] = [
    {
        title: 'Transactions',
        imageSrc:'/images/icons/Bills.svg',
        url: '/account/transactions'
    },
    {
        title: 'EthScan',
        imageSrc:'/images/icons/Invoices.svg',
        url: '/account/ethscan'
    },
    // {
    //     title: 'ТТН',
    //     imageSrc:'/images/icons/TTH.svg',
    //     url: '/account/ttn'
    // },
    // {
    //     title: 'Причепи',
    //     imageSrc:'/images/icons/Trailer.svg',
    //     url: '/account/trailer'
    // },
    // {
    //     title: 'Водії',
    //     imageSrc:'/images/icons/Drivers.svg',
    //     url: '/account/driver'
    // },

]
