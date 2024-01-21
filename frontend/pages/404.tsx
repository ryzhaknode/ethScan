import Head from "next/head";

const NotFoundPage = () => {
    // const { translations } = useContext(TranslationsContext);

    return (
        <>
            <Head>
                <title>Error</title>
                <link rel="icon" href="/images/favicon/untk32.png" />
            </Head>
            <main className="main-content">
                error
            </main>
        </>
    );
};

export default NotFoundPage;
