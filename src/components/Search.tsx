import { useState, useRef, useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import clsx from 'clsx'
import useSWR from 'swr'
import { search, image as imageUrl } from '@/configs/urls'
import LinkWithRef from '@/components/LinkWithRef'
import Image from 'next/image'

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchCloseRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])

  // set focus action
  useEffect(() => {
    if (!open) searchInputRef?.current?.focus()
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== '/') {
        return
      }
      e.preventDefault()
      setOpen(false)
      searchInputRef?.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    function onKeyClose(e: KeyboardEvent) {
      if (e.key !== 'Escape') {
        return
      }
      e.preventDefault()
      searchCloseRef?.current?.click()
    }
    window.addEventListener('keydown', onKeyClose)
    return () => {
      window.removeEventListener('keydown', onKeyClose)
    }
  }, [])

  const { data, error } = useSWR(
    searchQuery.length > 0
      ? [
          `${search}/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchQuery}`,
          searchQuery
        ]
      : '',
    url => fetch(url).then(res => res.json()),
    { shouldRetryOnError: true }
  )

  useEffect(() => {
    data !== undefined ? setSearchResult(data?.results ?? []) : undefined
  }, [data, error, searchQuery])

  useEffect(() => {
    if (searchQuery.length < 1) {
      setSearchResult([])
    }
  }, [data, error, searchQuery])

  return (
    <>
      <nav className="fixed inset-x-0 top-0 flex justify-end items-center px-4 py-3 text-gray-400 bg-transparent z-[5] md:px-10 lg:px-20 xl:px-30">
        <div className="flex space-x-6 font-bold">
          <button
            type="button"
            className="fixed top-3 right-4 text-white z-[5] bg-gray-800 bg-opacity-80 p-2 rounded-full transform transition-all duration-300"
            onClick={() => setOpen(false)}
          >
            <HiSearch className="w-auto h-6" />
          </button>
        </div>
      </nav>
      <div>
        <div
          className={clsx(
            'flex fixed inset-x-0 z-10 transform transition-all duration-200 bg-white shadow mx-auto rounded py-1 sm:px-6 lg:px-20 px-4',
            {
              'translate-y-0': !open,
              '-translate-y-full': open
            }
          )}
        >
          <label
            htmlFor="search-input"
            className="flex items-center flex-none pr-3"
          >
            <span className="sr-only">Search movie</span>
            <HiSearch className="w-auto h-5 text-gray-500 transition-colors duration-150 group-focus-within:text-gray-600" />
          </label>
          <input
            type="text"
            id="search-input"
            autoComplete="off"
            ref={searchInputRef}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search movies and shows (Press “ESCAPE” to quit)`}
            className={clsx(
              'w-full py-4 md:text-base text-sm leading-6 placeholder-gray-300 focus:outline-none focus:placeholder-gray-400',
              {}
            )}
          />
          <button
            ref={searchCloseRef}
            type="button"
            className="relative p-1 -ml-6 text-xs font-black text-gray-900 bg-yellow-200 rounded focus:outline-none"
            onClick={() => {
              setSearchQuery('')
              setOpen(true)
            }}
          >
            Esc
          </button>
        </div>
      </div>
      {!open && (
        <>
          <div
            className={clsx('fixed inset-0 z-[5] bg-yellow-200 bg-opacity-40')}
            onClick={() => {
              setOpen(true)
              setSearchQuery('')
            }}
          />
          <div className="absolute inset-x-0 bg-gray-100 z-[6] top-0 p-5 pt-20">
            {Array.isArray(searchResult) && searchResult?.length > 0 ? (
              <div
                className={clsx(
                  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:px-10 lg:px-20 xl:px-30 overflow-y-auto'
                )}
              >
                {searchResult.map((card: any, i: number) => (
                  <LinkWithRef
                    href={'/'}
                    className={clsx(
                      'flex space-x-2 bg-yellow-100 rounded-md overflow-hidden shadow-sm'
                    )}
                    key={i}
                  >
                    <div className="relative w-28 h-36">
                      <Image
                        src={
                          `${imageUrl}/original/${card?.poster_path}`
                          // `${imageUrl}/w780/${card?.poster_path}`
                        }
                        alt={card?.title ?? card?.name ?? card?.original_title}
                        layout="fill"
                        objectFit="cover"
                        className="relative"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-2">
                      <div className="space-y-2 text-sm">
                        <h2 className="font-bold text-gray-700">
                          {card?.title ?? card?.name ?? card?.original_title}
                        </h2>
                        <div className="text-xs">
                          {card?.release_date ?? card?.first_air_date ?? ''}
                        </div>
                      </div>
                      <div className="">
                        <span className="inline px-1 text-xs text-gray-600 bg-yellow-200 rounded-full">
                          {card?.media_type ?? ''}
                        </span>
                      </div>
                    </div>
                  </LinkWithRef>
                ))}
              </div>
            ) : (
              <div className="text-center">No results Found</div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Search
