import {useEffect, useState, createContext, useContext, ReactNode} from "react";
// import {getData} from "@/utils/fetchData";
import {useRouter} from "next/router";
import {Box, Container, ThemeProvider} from "@mui/material";
import {theme} from "../../../app/theme/theme";
import cls from './Layout.module.scss'

// const TranslationsContext = createContext();

interface LayoutProps {
    children: ReactNode
}

function Layout({children}: LayoutProps) {
    const {locale} = useRouter();
    const [translations, setTranslations] = useState();
    const [baseInfo, setBaseInfo] = useState();
    // const { state, dispatch } = useContext(DataContext);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const dataTranslations = await getData(`${locale}/translation/base`);
    //         const dataBaseInfo = await getData(`${locale}/base-info`);
    //
    //         setTranslations(dataTranslations);
    //         setBaseInfo(dataBaseInfo);
    //     };
    //
    //     fetchData();
    // }, [locale]);

    return (
        <ThemeProvider theme={theme}>
            <Container disableGutters maxWidth="xl">
                <main className={cls.main}>
                    {children}
                </main>
            </Container>
        </ThemeProvider>
    );
}

export {
    Layout,
    // TranslationsContext
};
