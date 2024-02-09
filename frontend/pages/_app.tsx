import type {AppProps} from 'next/app';
import '../styles/index.scss'
import {Provider, useSelector} from 'react-redux'
import {useEffect} from "react";
import {CookiesProvider, useCookies} from "react-cookie";
import {Layout} from "../components/widgets/Layout/ui/Layout";
import {getData} from "../api/api";
import {useRouter} from "next/router";
import AccountLayout from "../components/widgets/AccountLayout/ui/AccountLayout";
import {store} from "../components/app/redux/store/store";


export default function App({Component, pageProps}: AppProps) {
    const router = useRouter();
    const isAccount = router.pathname.includes('/account');


    return (
        <CookiesProvider>
            <Provider store={store}>
                <Layout>
                    {isAccount
                        ?
                        <AccountLayout>
                            <Component {...pageProps} />
                        </AccountLayout>
                        :
                        <Component {...pageProps} />
                    }
                </Layout>
            </Provider>
        </CookiesProvider>
    );
}
