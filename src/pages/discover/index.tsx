import { useState, useEffect } from 'react'
import useSWR from 'swr'
import clsx from 'clsx'
import { discover } from '@/configs/urls'
import Tabs from '@/components/Tabs'
import useStore from '@/store/store'
import shallow from 'zustand/shallow'
import { MovieType } from '@/store/types'
import Image from 'next/image'
import { image } from '@/configs/urls'

const Discover = () => {
  const [page, setPage] = useState(1)
  const [type, setType] = useState('movie') //-> movie, tv
  const [explicit, setExplicit] = useState('false')
  const [discovery, setDiscovery] = useStore(
    state => [state.discovery, state.setDiscovery],
    shallow
  )
  const [discoveryHead, setDiscoveryHead] = useState<MovieType[]>([])

  const { data, error } = useSWR(
    [
      `${discover}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}&include_adult=${explicit}&include_video=true`,
      type,
      explicit,
      page
    ],
    url => fetch(url).then(res => res.json()),
    { refreshInterval: 60000, shouldRetryOnError: true }
  )
  // set discovery data
  useEffect(() => {
    if (!error && data !== undefined) {
      setDiscovery(data?.results)
    }
  }, [error, data, setDiscovery])

  // set discovery header images
  useEffect(() => {
    if (discovery.length > 0) {
      setDiscoveryHead(discovery.sort(() => 0.5 - Math.random()).slice(0, 3))
    }
  }, [discovery])

  return (
    <main className="min-h-screen text-neutral-800">
      <section className="px-4 pt-7">
        {/* header */}
        <h1 className="my-5 text-2xl font-bold text-center lg:text-4xl text-neutral-900">
          Discover
        </h1>
        <div className="flex items-center justify-center max-w-sm mx-auto space-x-5">
          {/* explicit */}
          <button
            type="button"
            aria-sort="other"
            className={clsx(
              'focus:overflow-hidden rounded-sm font-black text-sm border-2 border-neutral-900 h-6 w-6',
              {
                'text-neutral-900 bg-white': explicit === 'false',
                'text-white bg-neutral-900': explicit === 'true'
              }
            )}
            onClick={() =>
              explicit === 'false' ? setExplicit('true') : setExplicit('false')
            }
          >
            E
          </button>
          {/* type tab */}
          <Tabs
            tabs={{
              movie: 'Movie',
              tv: 'TV Series'
            }}
            selected={type}
            onChange={setType}
            className="relative z-0 flex-1 overflow-hidden text-base rounded-tr-lg rounded-bl-lg bg-neutral-200"
            itemClassName={{
              container: 'bg-neutral-900',
              item: 'px-2 font-semibold',
              isSelected: 'text-white',
              notSelected: 'text-neutral-900'
            }}
          />
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-4 gap-3 px-4">
        {discoveryHead.length > 0 &&
          discoveryHead.map((movie: MovieType, i: number) => (
            <div
              key={movie.id}
              className={clsx(
                'relative h-72 bg-gradient-to-br from-stone-900 to-neutral-400 animate-moveGradientBg [background-size:200%_200%]',
                {
                  hidden: i !== 0,
                  'sm:block': i < 2,
                  'md:block': i <= 2
                }
              )}
            >
              <Image
                src={`${image}/original/${movie.backdrop_path}`}
                alt={movie?.name ?? movie?.title}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 object-cover w-full h-full"
                priority={true}
              />
            </div>
          ))}
      </section>
    </main>
  )
}

export default Discover
