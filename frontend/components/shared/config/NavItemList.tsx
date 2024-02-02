
interface itemValues {
    title: string;
    imageSrc: string;
    url: string
}

export const navItemList: itemValues[] = [
    {
        title: 'Portfolio',
        imageSrc:'/images/icons/TTH.svg',
        url: '/account/portfolio'
    },
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

]
