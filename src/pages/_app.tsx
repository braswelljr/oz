import '../styles/globals.css'
import { Fragment } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import MainLayout from '@/layouts/MainLayout'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>oz</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/oz.png" type="image/png" />
      </Head>
      <>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </>
    </>
  )
}

export default App
