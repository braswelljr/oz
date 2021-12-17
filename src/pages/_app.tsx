import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import MainLayout from '@/layouts/MainLayout'
import useSWR from 'swr'
import { genre as genreURL } from '@/configs/urls'
import useStore from '@/store/store'

const App = ({ Component, pageProps }: AppProps) => {
  const setMovieGenre = useStore(state => state.setMovieGenre)
  const setTvGenre = useStore(state => state.setTvGenre)

  const { data: movie, error: m } = useSWR(
    [`${genreURL}/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`],
    (url: string) => fetch(url).then(response => response.json()),
    { shouldRetryOnError: true }
  )
  const { data: tv, error: t } = useSWR(
    [`${genreURL}/tv/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`],
    (url: string) => fetch(url).then(response => response.json()),
    { shouldRetryOnError: true }
  )

  useEffect(() => {
    if (movie !== undefined && !m) setMovieGenre(movie?.genres)
  }, [movie, m, setMovieGenre])

  useEffect(() => {
    if (tv !== undefined && !t) setTvGenre(tv?.genres)
  }, [tv, t, setTvGenre])

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
