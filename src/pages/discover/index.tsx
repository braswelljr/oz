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
import LinkWithRef from '@/components/LinkWithRef'

const Discover = () => {
  const [page, setPage] = useState(1)
  const [type, setType] = useState('movie') //-> movie, tv
  const [explicit, setExplicit] = useState('false')
  const [discovery, setDiscovery] = useStore(
    state => [state.discovery, state.setDiscovery],
    shallow
  )
  const [discoveryHead, setDiscoveryHead] = useState<MovieType>(undefined)

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
      setDiscoveryHead(discovery[Math.floor(Math.random() * discovery.length)])
    }
  }, [discovery])

  return (
    <main className="min-h-screen text-neutral-800">
      <header className="w-full">
        {discoveryHead !== undefined && (
          <div className="w-full h-[475px] md:h-[575px] relative aspect-1">
            <Image
              src={`${image}/original/${discoveryHead.backdrop_path}`}
              alt={
                discoveryHead.title ??
                discoveryHead.name ??
                discoveryHead.original_title
              }
              layout="fill"
              objectFit="cover"
              className="relative"
              priority={true}
            />
            <div className="absolute inset-0 bg-neutral-700 bg-opacity-60 z-[1] grid">
              <h1 className="my-5 text-2xl font-bold mx-7 lg:text-4xl text-white">
                Discover
              </h1>
              {/*  */}
              <button
                type="button"
                aria-sort="other"
                className={clsx(
                  'focus:overflow-hidden rounded-sm font-black text-sm absolute top-5 right-5 border-neutral-900 h-6 w-6',
                  {
                    'text-neutral-900 bg-yellow-300': explicit === 'false',
                    'text-yellow-300 bg-neutral-900': explicit === 'true'
                  }
                )}
                onClick={() =>
                  explicit === 'false'
                    ? setExplicit('true')
                    : setExplicit('false')
                }
              >
                E
              </button>
              {/* type tab */}
              <div className="absolute bottom-5 inset-x-5">
                <Tabs
                  tabs={{
                    movie: 'Movie',
                    tv: 'TV Series'
                  }}
                  selected={type}
                  onChange={setType}
                  className="max-w-xs mx-auto z-0 overflow-hidden text-base bg-yellow-200 rounded-[1rem]"
                  itemClassName={{
                    container: 'bg-neutral-900',
                    item: 'px-3 py-1 font-semibold',
                    isSelected: 'text-white',
                    notSelected: 'text-neutral-900'
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="p-4 gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9">
        {discovery.length > 0 &&
          discovery.map((movie: MovieType) => (
            <LinkWithRef
              key={movie?.id}
              href={'/'}
              className={clsx('bg-stone-100 min-h-[18rem]')}
            >
              <div className="relative aspect-w-1 h-56">
                <Image
                  src={`${image}/original/${movie?.poster_path}`}
                  alt={movie?.name ?? movie?.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 object-cover w-full h-full"
                  priority={true}
                />
              </div>
            </LinkWithRef>
          ))}
      </section>
    </main>
  )
}

export default Discover
