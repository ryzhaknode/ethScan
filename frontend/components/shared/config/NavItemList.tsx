import TTH from '../../../public/images/icons/TTH.svg';
import Bills from '../../../public/images/icons/Bills.svg';
import Сar from '../../../public/images/icons/Car.svg';
import Drivers from '../../../public/images/icons/Drivers.svg';
import Invoices from '../../../public/images/icons/Invoices.svg';
import Trailer from '../../../public/images/icons/Trailer.svg';

import {ReactNode} from "react";

interface itemValues {
    title: string;
    icon: ReactNode;
    url: string
}

export const navItemList: itemValues[] = [
    {
        title: 'Рахунки',
        icon: <Bills/>,
        url: '/account/bills'
    },
    {
        title: 'Видаткові накладні',
        icon: <Invoices/>,
        url: '/account/invoices'
    },
    {
        title: 'ТТН',
        icon: <TTH/>,
        url: '/account/ttn'
    },
    {
        title: 'Авто',
        icon: <Сar/>,
        url: '/account/truck'
    },
    {
        title: 'Причепи',
        icon: <Trailer/>,
        url: '/account/trailer'
    },
    {
        title: 'Водії',
        icon: <Drivers/>,
        url: '/account/driver'
    },

]
