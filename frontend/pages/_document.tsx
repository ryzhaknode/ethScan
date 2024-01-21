import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <script src="https://unpkg.com/imask" async></script>
                <link rel="icon" href="/images/favicon/untk32.png" />
            </Head>
            <body className='bd-home'>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
