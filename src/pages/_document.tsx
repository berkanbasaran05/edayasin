import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
       <Head>
        <title>Eda-Yasin</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, maximum-scale=1" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}