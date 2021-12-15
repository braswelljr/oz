import { useState } from 'react'
import useSWR from 'swr'
import clsx from 'clsx'
import { discover } from '@/configs/urls'
import Tabs from '@/components/Tabs'
import useStore from '@/store/store'
import shallow from 'zustand/shallow'

const Discover = () => {
  const [page, setPage] = useState(1)
  const [type, setType] = useState('movie') //-> movie, tv
  const [explicit, setExplicit] = useState('false')
  const [discovery, setDiscovery] = useStore(
    state => [state.discovery, state.setDiscovery],
    shallow
  )
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
  if (!error && data !== undefined) {
    setDiscovery(data?.results)
  }

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
    </main>
  )
}

export default Discover
